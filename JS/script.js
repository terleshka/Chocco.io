const menuOpen = document.getElementById('menuOpen');
const menuModal = document.getElementById('menuModal');
const menuClose = document.getElementById('menuClose');
menuOpen.onclick = function() {
  menuModal.style.display = "flex";
};
menuClose.onclick = function() {
  menuModal.style.display = "none";
};

