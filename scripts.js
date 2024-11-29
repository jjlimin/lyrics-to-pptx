
document.getElementById('addSong').addEventListener('click', function() {
    // Create a new conteiner
    const container = document.createElement('div');
    container.classList.add('textarea-container'); // Add a class for styling purposes

    // Create a new textarea
    const newTextarea = document.createElement('textarea');
    newTextarea.classList.add('lyricsInput');

    // Create a new delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');

    // Append the textarea and delete button to the container
    container.appendChild(newTextarea);
    container.appendChild(deleteButton);

    // Add event listener to the delete button to remove the container (textarea + button)
    deleteButton.addEventListener('click', function() {
        container.remove();
    });

    // Insert the new element before the first element
    const body = document.body;
    const buttons = document.getElementsByClassName('buttons-container')[0];
    body.insertBefore(container, buttons);
});


// when the button is clicked it gets the lyrics
document.getElementById('generatePPT').addEventListener('click', function() {

    // Get the checkbox status
    const isBlackBackground = document.getElementById('blackBackgroundCheckbox').checked;

    // get all the textareas
    const lyricsTextAreas = document.querySelectorAll('.lyricsInput');

    // prepare empty lyrics variable
    let allLyrics = '';
    // get lyrics from each textarea
    lyricsTextAreas.forEach(textarea => {
        // given a textarea extract it's lyrics
        const lyrics = textarea.value.trim();
        // add to the main lyrics variable
        if (lyrics) {
            allLyrics += lyrics + '\n\n';
        }
    });

    // if there is no lyrics alert
    if (!allLyrics) {
        alert('Please paste your song lyrics.');
        return;
    }

    // Process the lyrics into sections
    const slidesContent = processLyrics(allLyrics);

    // Generate PowerPoint
    generatePowerPoint(slidesContent, isBlackBackground);
});

/**
 * Splits the lyrics into sections based on double line breaks.
 * You can customize this function to better identify verses, choruses, etc.
 * @param {string} allLyrics 
 * @returns {Array} Array of lyric sections
 */
function processLyrics(allLyrics) {
    // Split lyrics by two or more line breaks
    const sections = allLyrics.split(/\n{2,}/).map(section => section.trim()).filter(section => section !== '');
    return sections;
}

/**
 * Generates and triggers download of the PowerPoint presentation.
 * @param {Array} slidesContent 
 */
function generatePowerPoint(slidesContent, isBlackBackground) {
    let pptx = new PptxGenJS();

    // loop through each section in slideContent
    slidesContent.forEach((section, index) => {

        let slide = pptx.addSlide();

        let backgroundColor = isBlackBackground ? '000000' : 'FFFFFF'; // Black or White background

        slide.background = { fill: backgroundColor };

        let textColor = isBlackBackground ? 'FFFFFF' : '000000';

        // Optionally, you can add titles like "Verse 1", "Chorus", etc.
        // For simplicity, we'll just add the section text
        slide.addText(section, {
            x: 0.0,          // Horizontal position (0.0 means leftmost position)
            y: 0.0,          // Vertical position (1.0 means top of the slide)
            w: '100%',       // Set width to 100% of the slide width to allow the text to occupy full width
            h: '100%',       // Set height to 100% of the slide height
            fontSize: 36,    // Font size for the text
            align: 'center', // Center the text horizontally
            valign: 'middle',// Center the text vertically
            color: textColor, // Text color
            bold: false,     // Regular weight text
            breakLine: true  // Allow text to break to new lines if necessary
        });
    });

    // Get the file name from user input
    let fileName = prompt("Enter the file name for the presentation:") + ".pptx";

    // Save the PowerPoint file with the entered file name
    pptx.writeFile({ fileName: fileName });
}