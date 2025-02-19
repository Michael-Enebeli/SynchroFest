document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("no-scroll");
    function checkReady() {
      const performancesData = localStorage.getItem("performances");
      const imagesCount = document.querySelectorAll("img").length;
  
      if (
        typeof window.updatePerformances === "function" &&
        performancesData &&
        imagesCount >= 12
      ) {
        const content = document.getElementById("root");
        content.style.opacity = 1;
        content.style.pointerEvents = "auto";
        document.getElementById("spinner").style.display = "none";
        document.body.classList.remove("no-scroll");
      } else {
        setTimeout(checkReady, 100);
      }
    }
    checkReady();
  });
