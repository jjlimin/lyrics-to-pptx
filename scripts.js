
document.getElementById('addSong').addEventListener('click', function() {
    // Create a new element
    const newTextarea = document.createElement('textarea');
    newTextarea.id = 'lyricsInput';

    // Insert the new element before the first element
    const body = document.body;
    const buttons = document.getElementsByClassName('buttons-container')[0];
    body.insertBefore(newTextarea, buttons);
});


// when the button is clicked it gets the lyrics
document.getElementById('generatePPT').addEventListener('click', function() {
    const lyrics = document.getElementById('lyricsInput').value.trim();

    // if there is no lyrics alert
    if (!lyrics) {
        alert('Please paste your song lyrics.');
        return;
    }

    // Process the lyrics into sections
    const slidesContent = processLyrics(lyrics);

    // Generate PowerPoint
    generatePowerPoint(slidesContent);
});

/**
 * Splits the lyrics into sections based on double line breaks.
 * You can customize this function to better identify verses, choruses, etc.
 * @param {string} lyrics 
 * @returns {Array} Array of lyric sections
 */
function processLyrics(lyrics) {
    // Split lyrics by two or more line breaks
    const sections = lyrics.split(/\n{2,}/).map(section => section.trim()).filter(section => section !== '');
    return sections;
}

/**
 * Generates and triggers download of the PowerPoint presentation.
 * @param {Array} slidesContent 
 */
function generatePowerPoint(slidesContent) {
    let pptx = new PptxGenJS();

    // loop through each section in slideContent
    slidesContent.forEach((section, index) => {
        let slide = pptx.addSlide();

        // Optionally, you can add titles like "Verse 1", "Chorus", etc.
        // For simplicity, we'll just add the section text
        slide.addText(section, {
            x: 0.5,          // Horizontal position of the text (left margin).
            y: 1.0,          // Vertical position of the text (top margin).
            w: '90%',        // Width of the text box (90% of the slide width).
            h: '70%',        // Height of the text box (70% of the slide height).
            fontSize: 24,    // Font size for the text.
            align: 'left',   // Text alignment (left-aligned).
            valign: 'top',   // Vertical alignment (top-aligned).
            color: '363636', // Text color (dark gray).
            bold: false,     // Bold text? (false means regular weight).
            breakLine: true  // Enable line breaks within the text box.
        });
    });

    // Get the file name from user input
    let fileName = prompt("Enter the file name for the presentation:") + ".pptx";

    // Save the PowerPoint file with the entered file name
    pptx.writeFile({ fileName: fileName });
}