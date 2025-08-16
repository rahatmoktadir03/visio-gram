// Utility functions for button interactions and feedback

export const showToast = (
  message: string,
  type: "success" | "error" | "info" = "info"
) => {
  // Create a simple toast notification
  const toast = document.createElement("div");
  toast.className = `fixed top-20 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white transition-all duration-300 transform translate-x-0 ${
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : "bg-blue-500"
  }`;
  toast.textContent = message;

  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.transform = "translateX(-8px)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard!", "success");
    return true;
  } catch {
    showToast("Failed to copy", "error");
    return false;
  }
};

export const downloadImage = (
  url: string,
  filename: string = "visiogram-image.jpg"
) => {
  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    showToast("Download started!", "success");
  } catch {
    showToast("Download failed", "error");
  }
};

export const shareImage = async (image: { prompt: string; url: string }) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Check out this AI-generated image!",
        text: `"${image.prompt}" - Generated on VisioGram`,
        url: window.location.href,
      });
      showToast("Shared successfully!", "success");
    } catch (error) {
      // User cancelled sharing
      if (error instanceof Error && error.name !== "AbortError") {
        copyToClipboard(
          `Check out this AI-generated image: "${image.prompt}" on VisioGram!`
        );
      }
    }
  } else {
    // Fallback: copy to clipboard
    copyToClipboard(
      `Check out this AI-generated image: "${image.prompt}" on VisioGram!`
    );
  }
};
