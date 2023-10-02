// document.body.innerText = "Hello world";
// document.body.innerHTML;
/**
 * Uncaught TypeError: Cannot set properties of null (setting 'innerText')
 */
// document.getElementById("hello-world").innerText = "hello world";

window.addEventListener('load', () => {
 document.getElementById("hello-world").innerText = `
 <div style="width:100px;height:100px; background:red">
 </div>`;

 const someHtml = document.getElementById("some-html");

 someHtml.innerHTML = `
 <div style="width:100px;height:100px; background:red">
 </div>`;



 const btn = document.getElementById("btn1");
 const input = document.getElementById("count-of-squares"); // value | null
 const containers = document.getElementsByClassName("container"); // [v1,v2, ..] || []
 btn.addEventListener('click', () => {
  const value = input.value; // "123" | ""
  if (!value) {
   return;
  }

  // const numberValue = parseInt(value);
  const numberValue = +value;
  containers[0].innerHTML = "";
  for (let i = 0; i < numberValue / 5; i += 1) {
   // containers[0].innerHTML += `
   // <div class="item" style="--anim-delay:${i * 0.2}s">${i + 1}</div>
   // `;
   let str = '';
   for (let j = 0; j < 5; j += 1) {

    const index = i * 5 + j + 1;
    str += `
    <div class="item" style="--anim-delay:${index * 0.2}s">${index}</div>
    `;
   }
   containers[0].innerHTML += `<div>${str}</div>`;


   const items = document.getElementsByClassName('item');

   for (const item of items) {
    item.addEventListener('click', () => {
     console.log("I clicked", item.innerText);
     // item.remove();
     item.className += " empty";
    });
   }



   // containers[0].innerHTML +=
   //  '<div class="item">'
   //  + i
   //  + '</div>';
  }
  // containers[0].innerHTML = containers[0].innerHTML + `<div class="item"></div>`;
 });
});