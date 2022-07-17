document.querySelector('#newItemInput').addEventListener('input', e => {
    // Don't allow submitting empty string
    document.querySelector('#addItemButton').disabled = !document.querySelector('#newItemInput').value.trim().length;
});

document.querySelector('#addItemButton').addEventListener('click', e => {
    let draft = document.querySelector('#newItemInput').value.trim();

    // Append item to the list
    document.querySelector('#list').innerHTML += `
        <li>
            <div class="item">
                <span class="itemText">${draft}</span>
                <button class="editItemButton">Edit</button>
                <button class="removeItemButton">Remove</button>
            </div>
            
            <div class="itemEditor" style="display: none;">
                <input class="editInput" type="text" value="${draft}">
                <button class="saveEditButton">Save</button>
                <button class="cancelEditButton">Cancel</button>
            </div>
        </li>
    `;

    // Reset the form
    document.querySelector('#newItemInput').value = '';
    document.querySelector('#addItemButton').disabled = true;

    // We have to re-apply the event listeners to all items (instead of to just the newly added one),
    // because modifying the parent's innerHTML resets the event listeners for some reason.
    document.querySelectorAll('.itemText').forEach(el => {
        el.addEventListener('click', e => {
            e.target.classList.toggle('strikethrough');
        });
    });

    document.querySelectorAll('.editItemButton').forEach(el => {
        el.addEventListener('click', e => {
            let parent = e.target.parentElement.parentElement;

            // Hide the list item
            parent.querySelector('.item').style.display = 'none';

            // Show the editor
            parent.querySelector('.itemEditor').style.display = 'initial';
        });
    });

    document.querySelectorAll('.itemEditor').forEach(el => {
        el.querySelector('.editInput').addEventListener('input', e => {
            // Don't allow submitting empty string
            el.querySelector('.saveEditButton').disabled = !el.querySelector('.editInput').value.trim().length;
        })
    });

    document.querySelectorAll('.saveEditButton').forEach(el => {
        el.addEventListener('click', e => {
            let parent = e.target.parentElement.parentElement;
            let newValue = parent.querySelector('.editInput').value.trim();

            // Save the new value
            parent.querySelector('.itemText').innerHTML = newValue;
            parent.querySelector('.editInput').value = newValue;
            parent.querySelector('.editInput').defaultValue = newValue;

            // Show the list item
            parent.querySelector('.item').style.display = 'initial';

            // Hide the editor
            parent.querySelector('.itemEditor').style.display = 'none';
        });
    });

    document.querySelectorAll('.cancelEditButton').forEach(el => {
        el.addEventListener('click', e => {
            let parent = e.target.parentElement.parentElement;

            // Restore the original value
            parent.querySelector('.editInput').value = parent.querySelector('.editInput').defaultValue;
            parent.querySelector('.saveEditButton').disabled = false;

            // Show the list item
            parent.querySelector('.item').style.display = 'initial';

            // Hide the editor
            parent.querySelector('.itemEditor').style.display = 'none';
        });
    });

    document.querySelectorAll('.removeItemButton').forEach(el => {
        el.addEventListener('click', e => {
            e.target.parentElement.parentElement.remove();
        });
    });
});