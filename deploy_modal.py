#!/usr/bin/env python3
"""
Deployment script for the VisioGram Modal app
Run this to deploy your image generation function to Modal
"""

import subprocess
import sys

def install_modal():
    """Install the Modal client if not already installed"""
    try:
        import modal
        print("✅ Modal client already installed")
    except ImportError:
        print("📦 Installing Modal client...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "modal"])
        print("✅ Modal client installed")

def deploy_app():
    """Deploy the Modal app"""
    print("🚀 Deploying Modal app...")
    result = subprocess.run(["modal", "deploy", "modal_app.py"], capture_output=True, text=True)
    
    if result.returncode == 0:
        print("✅ Deployment successful!")
        print("\n📋 Deployment output:")
        print(result.stdout)
        
        # Extract the web endpoint URL from the output
        lines = result.stdout.split('\n')
        for line in lines:
            if 'web_endpoint' in line and 'https://' in line:
                url = line.split('https://')[1].split()[0]
                print(f"\n🌐 Your API endpoint URL is: https://{url}")
                print(f"📝 Add this to your .env.local as MODAL_IMAGE_API_URL=https://{url}")
                break
    else:
        print("❌ Deployment failed!")
        print("Error:", result.stderr)
        return False
    
    return True

if __name__ == "__main__":
    print("🔧 Setting up VisioGram Modal deployment...")
    
    install_modal()
    
    print("\n🔑 Make sure you're authenticated with Modal:")
    print("Run: modal token new")
    print("Then continue with deployment...")
    
    input("\nPress Enter when you're ready to deploy...")
    
    if deploy_app():
        print("\n🎉 All done! Your image generation API is now live!")
        print("Update your .env.local with the endpoint URL and test your app!")
    else:
        print("\n💡 If deployment failed, make sure:")
        print("1. You're authenticated: modal token new")
        print("2. Your secrets are set up correctly in Modal dashboard")
        print("3. You have sufficient credits in your Modal account")
