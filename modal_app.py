import modal
import io
import base64
from PIL import Image

# Create the Modal app
app = modal.App("visio-gram")

# Define the image for our function with required dependencies
image = modal.Image.debian_slim(python_version="3.11").pip_install([
    "torch",
    "torchvision", 
    "diffusers",
    "transformers",
    "accelerate",
    "pillow",
    "numpy"
])

@app.function(
    image=image,
    gpu="A10G",  # Use A10G GPU for good performance/cost balance
    timeout=300,  # 5 minute timeout
    secrets=[modal.Secret.from_name("visio-gram")]
)
def generate_image(prompt: str):
    """Generate an image from a text prompt using Stable Diffusion"""
    import torch
    from diffusers import StableDiffusionPipeline
    
    # Load the model
    pipe = StableDiffusionPipeline.from_pretrained(
        "runwayml/stable-diffusion-v1-5",
        torch_dtype=torch.float16
    )
    pipe = pipe.to("cuda")
    
    # Generate the image
    with torch.autocast("cuda"):
        image = pipe(prompt, num_inference_steps=20).images[0]
    
    # Convert to base64 for easy transmission
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    image_base64 = base64.b64encode(buffer.getvalue()).decode()
    
    return {
        "success": True,
        "image_base64": image_base64,
        "prompt": prompt
    }

# Web endpoint for your Next.js app to call
@app.function(
    image=modal.Image.debian_slim().pip_install(["fastapi"]),
    secrets=[modal.Secret.from_name("visio-gram")]
)
@modal.fastapi_endpoint(method="POST")
def api_generate_image(item: dict):
    """Web endpoint that your Next.js app will call"""
    prompt = item.get("prompt", "")
    
    if not prompt:
        return {"success": False, "error": "Prompt is required"}
    
    try:
        # Call the image generation function
        result = generate_image.remote(prompt)
        
        # For now, return a placeholder - you'll need to upload the image to storage
        # and return the URL. This is a simplified version.
        return {
            "success": True,
            "imageUrl": f"data:image/png;base64,{result['image_base64']}",
            "prompt": prompt
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    # Test locally
    with app.run():
        result = generate_image.remote("a beautiful sunset over mountains")
        print("Generated image successfully!")
