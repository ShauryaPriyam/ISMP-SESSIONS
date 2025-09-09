 // ==== ID selector ====
    const heading = document.getElementById("main-heading");
    heading.textContent = "SOFTCOM!!!";
    heading.style.color = "blue";

    // ==== Class selector ====
    const paras = document.getElementsByClassName("para");
    paras[0].classList.add("highlight");   // add CSS class
    paras[1].classList.add("big");
    paras[0].style.color="red"

    // ==== Tag selector ====
    const allLi = document.getElementsByTagName("li");
    allLi[0].style.color = "red";     // Apple
    allLi[2].style.fontStyle = "italic";  // Banana

    // ==== querySelector / querySelectorAll ====
    const firstPara = document.querySelector(".para"); // first matching
    firstPara.textContent = "Updated with querySelector";

    const allParas = document.querySelectorAll("p"); // all <p>
    allParas[2].style.fontSize = "40px";

    const h2=document.querySelector("#sub-heading");
    h2.style.fontWeight="bold";
