function displayModal() {
    console.log("test")
    const editModal = document.querySelector('.popup')
    if (editModal.classList.contains('hidden') ) {
        editModal.classList.remove('hidden')
        
    } else {
        editModal.classList.add("hidden")
    }
}




