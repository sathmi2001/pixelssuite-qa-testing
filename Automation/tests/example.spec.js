const { test, expect } = require('@playwright/test');

// Base URL
const URL = 'https://www.pixelssuite.com/';

// 1. Homepage Load Test
test('Homepage loads correctly', async ({ page }) => {
  await page.goto(URL);
  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator('body')).toBeVisible();
});

// 2. Dropdown Open Test
test('Document Converter dropdown opens', async ({ page }) => {
  await page.goto(URL);

  //await page.getByText('Document Converter').hover();
  await page.getByRole('button', { name: 'Document Converter ▾' }).hover();

  await expect(page.getByText('Image → PDF')).toBeVisible();
});

// 3. Dropdown Navigation Test
test('Navigate to Image → PDF page', async ({ page }) => {
  await page.goto(URL);

  // await page.getByText('Document Converter').hover();
  await page.getByRole('button', { name: 'Document Converter ▾' }).hover();
  await page.getByText('Image → PDF').click();

  await page.waitForLoadState('load');

  await expect(page).not.toHaveURL(URL);
});

// 4. Test Multiple Dropdown Links
test('Test multiple document converter links', async ({ page }) => {
  await page.goto(URL);

  const options = ['Image → PDF', 'PDF → Word', 'Word → PDF'];

  for (let option of options) {
    //await page.getByText('Document Converter').hover();
    await page.getByRole('button', { name: 'Document Converter ▾' }).hover();
    await page.getByText(option).click();

    await page.waitForLoadState('load');

    console.log(`${option} page opened`);

    await page.goto(URL);
  }
});

// 5. Resize Menu Navigation
test('Resize menu navigation', async ({ page }) => {
  await page.goto(URL);

  //await page.getByText('Resize').hover();
  await page.getByRole('button', { name: 'Resize ▾' }).hover();
  await page.getByText('Image Enlarger').click();

  await page.waitForLoadState('load');

  await expect(page).not.toHaveURL(URL);
});

// 6. Crop Menu Navigation
test('Crop menu navigation', async ({ page }) => {
  await page.goto(URL);

  //await page.getByText('Crop').hover();
  await page.getByRole('button', { name: 'Crop ▾' }).hover();
  await page.getByRole('button', { name: 'To PNG' }).first().click();

  await page.waitForLoadState('load');

  await expect(page).not.toHaveURL(URL);
});

// 7. Compress Menu Navigation
test('Compress menu navigation', async ({ page }) => {
  await page.goto(URL);

  await page.getByText('Compress').hover();
  await page.getByText('Compress Image').click();

  await page.waitForLoadState('load');

  await expect(page).not.toHaveURL(URL);
});

// 8. Input Field Test (textarea)
test('Text input works correctly', async ({ page }) => {
  await page.goto(URL);

  const input = page.locator('textarea').first();

  if (await input.count() > 0) {
    await input.fill('Hello Testing');
    await expect(input).toHaveValue('Hello Testing');
  } else {
    console.log('No textarea found on homepage');
  }
});

// 9. Button Click Test
test('Button click works', async ({ page }) => {
  await page.goto(URL);

  const button = page.getByRole('button').first();

  if (await button.count() > 0) {
    await button.click();
    await page.waitForTimeout(2000);
  } else {
    console.log('No button found');
  }
});

// 10. Edge Case - Empty Input
test('Empty input validation', async ({ page }) => {
  await page.goto(URL);

  const button = page.getByRole('button').first();

  if (await button.count() > 0) {
    await button.click();
    await page.waitForTimeout(2000);

    console.log('Checked empty input behavior');
  }
});

// 11. Page Content Verification
test('Main content visible', async ({ page }) => {
  await page.goto(URL);

  await expect(page.getByText('Free Online Tools')).toBeVisible();
});

// 12. Screenshot Test (for report)
test('Take homepage screenshot', async ({ page }) => {
  await page.goto(URL);

  await page.screenshot({ path: 'homepage.png', fullPage: true });
});

// ================================
// NEW TESTS (Image → PDF PAGE)
// ================================

// 12. Open Image → PDF Page
test('Open Image to PDF page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/image-to-pdf');

  await expect(page.getByText('Image → PDF')).toBeVisible();
});

// 13. Check UI Elements
test('Check all UI elements', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/image-to-pdf');

  await expect(page.getByText('Select Images')).toBeVisible();
  await expect(page.getByText('Create PDF')).toBeVisible();
  await expect(page.getByText('A4')).toBeVisible();
  await expect(page.getByText('Portrait')).toBeVisible();
});

// 14. Upload image
test('Upload image file', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/image-to-pdf');

  const fileInput = page.locator('input[type="file"]');

  await fileInput.setInputFiles('tests/files/test.png');

  // Wait for preview or selection
  await page.waitForTimeout(2000);

  console.log('Image uploaded');
});

// 15. Click options
test('Change settings options', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/image-to-pdf');

  await page.getByText('Letter').click();
  await page.getByText('Landscape').click();
  await page.getByText('Horizontal').click();
  await page.getByText('Multiple').click();

  console.log('Options changed');
});

// 16. Create PDF
test('Create PDF after upload', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/image-to-pdf');

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles('tests/files/test.png');

  await page.waitForTimeout(2000);

  await page.getByText('Create PDF').click();

  await page.waitForTimeout(3000);

  console.log('Create PDF clicked');
});

// 17. Edge case - Document Converter
test('Create PDF without uploading file', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/image-to-pdf');

  await page.getByText('Create PDF').click();

  await page.waitForTimeout(2000);

  // Expect some validation (may fail = BUG)
  console.log('Checked empty upload case');
});

test('Screenshot Image to PDF page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/image-to-pdf');

  await page.screenshot({ path: 'image-to-pdf.png', fullPage: true });
});

// ================================
// WORD → PDF PAGE TESTS
// ================================

// 1: Check if Word to PDF page loads correctly
test('Open Word to PDF page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/word-to-pdf');   // Navigate to Word → PDF page
  await expect(page.getByText('Word → PDF')).toBeVisible();  // Verify page heading is visible
});

// 2: Verify important UI elements are present
test('Word to PDF UI elements visible', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/word-to-pdf'); 

  await expect(page.getByText('Select Word')).toBeVisible(); // Check if "Select Word" button is visible
  await expect(page.getByText('Drag and drop your file here')).toBeVisible();  // Check if drag-and-drop area text is visible
});

// 3: Upload a Word file
test('Upload Word file', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/word-to-pdf');

  const fileInput = page.locator('input[type="file"]'); // Locate file input element
  await fileInput.setInputFiles('tests/files/test.docx');  // Upload a sample Word file

  await page.waitForTimeout(2000);
});

// 4: Edge case - Click upload without selecting file
test('Word to PDF without file (edge case)', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/word-to-pdf');

  // Click upload button without selecting a file
  await page.getByText('Select Word').click(); 

  await page.waitForTimeout(2000);
});

test('Word to PDF screenshot', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/word-to-pdf');

  await page.screenshot({ path: 'word-to-pdf.png', fullPage: true });
});


// ================================
// PDF → WORD PAGE TESTS
// ================================

test('Open PDF to Word page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/pdf-to-word');
  await expect(page.getByText('PDF → Word')).toBeVisible();
});

test('PDF to Word UI elements visible', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/pdf-to-word');

  await expect(page.getByText('Select PDF')).toBeVisible();
  await expect(page.getByText('Drag and drop your file here')).toBeVisible();
});

test('Upload PDF file', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/pdf-to-word');

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles('tests/files/test.pdf');

  await page.waitForTimeout(2000);
});

test('PDF to Word without file (edge case)', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/pdf-to-word');

  await page.getByText('Select PDF').click();

  await page.waitForTimeout(2000);
});

test('PDF to Word screenshot', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/pdf-to-word');

  await page.screenshot({ path: 'pdf-to-word.png', fullPage: true });
});

// ================================
// PDF EDITOR PAGE TESTS
// ================================

// 1. Open PDF Editor page and verify heading
test('Open PDF Editor page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/pdf-editor');

  // Verify page title/heading is visible
  await expect(page.getByText('PDF Editor')).toBeVisible();
});


// 2. Verify main UI elements are visible
test('PDF Editor UI elements visible', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/pdf-editor');

  // Check file upload button
  await expect(page.getByText('Choose File')).toBeVisible();

  // Check toolbar elements
  await expect(page.locator('text=Toolbar')).toBeVisible();

  // Check Download button
  await expect(page.getByText('Download')).toBeVisible();

  // Check page navigation controls
  await expect(page.getByText('Prev')).toBeVisible();
  await expect(page.getByText('Next')).toBeVisible();
});


// 3. Upload PDF file into editor
test('Upload PDF file into editor', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/pdf-editor');

  // Locate file input
  const fileInput = page.locator('input[type="file"]');

  // Upload a sample PDF file 
  await fileInput.setInputFiles('tests/files/test.pdf');

  // Wait for file to load in editor
  await page.waitForTimeout(3000);

  console.log('PDF file uploaded');
});


// 4. Toolbar interaction (click tools)
test('Toolbar buttons interaction', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/pdf-editor');

  // Click text tool (T icon)
  await page.locator('button:has-text("T")').click().catch(() => {});

  // Click bold (B)
  await page.locator('text=B').click().catch(() => {});

  // Click alignment options (L, C, R)
  await page.locator('text=L').click().catch(() => {});
  await page.locator('text=C').click().catch(() => {});
  await page.locator('text=R').click().catch(() => {});

  console.log('Toolbar interactions tested');
});


// 5. Zoom control interaction
test('Zoom slider interaction', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/pdf-editor');

  // Locate zoom slider and change value
  const zoomSlider = page.locator('input[type="range"]');

  if (await zoomSlider.count() > 0) {
    await zoomSlider.fill('150');
  }

  await page.waitForTimeout(2000);

  console.log('Zoom adjusted');
});


// 6. Page navigation buttons
test('Page navigation buttons', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/pdf-editor');

  // Click next and previous buttons
  await page.getByText('Next').click().catch(() => {});
  await page.getByText('Prev').click().catch(() => {});

  await page.waitForTimeout(2000);

  console.log('Page navigation tested');
});


// 7. Download button without uploading file (EDGE CASE)
test('Download without uploading PDF (edge case)', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/pdf-editor');

  // Click download without uploading file
  await page.getByText('Download').click();

  await page.waitForTimeout(2000);

  // Expect validation or no response (possible defect)
  console.log('Checked download without file');
});


// 8. Screenshot for report
test('PDF Editor screenshot', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/pdf-editor');

  // Capture full page screenshot
  await page.screenshot({ path: 'pdf-editor.png', fullPage: true });
});

// ================================
// RESIZE IMAGE PAGE TESTS
// ================================

// 1. Open Resize Image page
test('Open Resize Image page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/resize');

  // Verify page title
  await expect(page.getByText('Resize Image')).toBeVisible();
});


// 2. Check UI elements
test('Resize Image UI elements', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/resize');

  // Check upload button and preview section
  await expect(page.getByText('Select files')).toBeVisible();
  await expect(page.getByText('Preview')).toBeVisible();
});


// 3. Upload image
test('Upload image in Resize page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/resize');

  // Locate file input
  const fileInput = page.locator('input[type="file"]');

  // Upload test image
  await fileInput.setInputFiles('tests/files/test.png');

  await page.waitForTimeout(2000);
});


// 4. Screenshot
test('Resize Image screenshot', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/resize');

  await page.screenshot({ path: 'resize.png', fullPage: true });
});


// ================================
// BULK RESIZE PAGE TESTS
// ================================

// 5. Open Bulk Resize page
test('Open Bulk Resize page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/batch-resize');

  await expect(page.getByText('Bulk Resize')).toBeVisible();
});


// 6. Check UI elements
test('Bulk Resize UI elements', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/batch-resize');

  // Verify input fields and button
  await expect(page.getByPlaceholder('Width')).toBeVisible();
  await expect(page.getByPlaceholder('Height')).toBeVisible();
  await expect(page.getByText('Process & Download')).toBeVisible();
});


// 7. Upload multiple images
test('Upload multiple images', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/batch-resize');

  const fileInput = page.locator('input[type="file"]');

  // Upload multiple files
  await fileInput.setInputFiles([
    'tests/files/test.png',
    'tests/files/test2.png'
  ]);

  await page.waitForTimeout(2000);
});


// 8. Enter dimensions and process
test('Enter dimensions and process images', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/batch-resize');

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles('tests/files/test.png');

  // Enter width & height
  await page.getByPlaceholder('Width').fill('500');
  await page.getByPlaceholder('Height').fill('500');

  // Click process button
  await page.getByText('Process & Download').click();

  await page.waitForTimeout(3000);
});


// 9. Edge case (no upload)
test('Bulk Resize without upload (edge case)', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/batch-resize');

  await page.getByText('Process & Download').click();

  await page.waitForTimeout(2000);
});


// ================================
// IMAGE ENLARGER PAGE TESTS
// ================================

// 10. Open Image Enlarger page
test('Open Image Enlarger page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/image-enlarger');

  await expect(page.getByText('Image Enlarger')).toBeVisible();
});


// 11. Check UI elements
test('Image Enlarger UI elements', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/image-enlarger');

  await expect(page.getByText('Select files')).toBeVisible();
  await expect(page.getByText('Preview')).toBeVisible();
});


// 12. Upload image
test('Upload image in Image Enlarger', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/image-enlarger');

  const fileInput = page.locator('input[type="file"]');

  await fileInput.setInputFiles('tests/files/test.png');

  await page.waitForTimeout(2000);
});


// 13. Screenshot
test('Image Enlarger screenshot', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/image-enlarger');

  await page.screenshot({ path: 'image-enlarger.png', fullPage: true });
});

// ================================
// CROP PNG PAGE TESTS
// ================================

// 1. Open Crop PNG page
test('Open Crop PNG page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/crop-png');

  // Verify page title
  await expect(page.getByText('Crop PNG')).toBeVisible();
});


// 2. Check UI elements
test('Crop PNG UI elements', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/crop-png');

  // Check upload area and preview section
  await expect(page.getByText('Select files')).toBeVisible();
  await expect(page.getByText('Preview')).toBeVisible();
});


// 3. Upload PNG image
test('Upload PNG image for cropping', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/crop-png');

  const fileInput = page.locator('input[type="file"]');

  // Upload PNG file
  await fileInput.setInputFiles('tests/files/test.png');

  await page.waitForTimeout(2000);
});


// 4. Screenshot
test('Crop PNG screenshot', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/crop-png');

  await page.screenshot({ path: 'crop-png.png', fullPage: true });
});


// ================================
// CROP JPG PAGE TESTS
// ================================

// 5. Open Crop JPG page
test('Open Crop JPG page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/crop-jpg');

  await expect(page.getByText('Crop JPG')).toBeVisible();
});


// 6. Check UI elements
test('Crop JPG UI elements', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/crop-jpg');

  await expect(page.getByText('Select files')).toBeVisible();
  await expect(page.getByText('Preview')).toBeVisible();
});


// 7. Upload JPG image
test('Upload JPG image for cropping', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/crop-jpg');

  const fileInput = page.locator('input[type="file"]');

  // Upload JPG file
  await fileInput.setInputFiles('tests/files/test.jpg');

  await page.waitForTimeout(2000);
});


// 8. Screenshot
test('Crop JPG screenshot', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/crop-jpg');

  await page.screenshot({ path: 'crop-jpg.png', fullPage: true });
});


// ================================
// CROP WEBP PAGE TESTS
// ================================

// 9. Open Crop WebP page
test('Open Crop WebP page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/crop-webp');

  await expect(page.getByText('Crop WebP')).toBeVisible();
});


// 10. Check UI elements
test('Crop WebP UI elements', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/crop-webp');

  await expect(page.getByText('Select files')).toBeVisible();
  await expect(page.getByText('Preview')).toBeVisible();
});


// 11. Upload WebP image
test('Upload WebP image for cropping', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/crop-webp');

  const fileInput = page.locator('input[type="file"]');

  // Upload WebP file
  await fileInput.setInputFiles('tests/files/test.webp');

  await page.waitForTimeout(2000);
});


// 12. Screenshot
test('Crop WebP screenshot', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/crop-webp');

  await page.screenshot({ path: 'crop-webp.png', fullPage: true });
});

// ================================
// COMPRESS IMAGE PAGE TESTS
// ================================

// 1. Open Compress Image page
test('Open Compress Image page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/compress');

  // Verify page title
  await expect(page.getByText('Compress Image')).toBeVisible();
});


// 2. Check UI elements
test('Compress Image UI elements', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/compress');

  // Check upload button and preview section
  await expect(page.getByText('Select files')).toBeVisible();
  await expect(page.getByText('Preview')).toBeVisible();
});


// 3. Upload image
test('Upload image for compression', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/compress');

  const fileInput = page.locator('input[type="file"]');

  // Upload test image (png or jpg)
  await fileInput.setInputFiles('tests/files/test.png');

  await page.waitForTimeout(2000);
});


// 4. Screenshot
test('Compress Image screenshot', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/compress');

  await page.screenshot({ path: 'compress.png', fullPage: true });
});


// ================================
// PNG COMPRESSOR PAGE TESTS
// ================================

// 5. Open PNG Compressor page
test('Open PNG Compressor page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/compress-png');

  await expect(page.getByText('PNG Compressor')).toBeVisible();
});


// 6. Check UI elements
test('PNG Compressor UI elements', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/compress-png');

  await expect(page.getByText('Select files')).toBeVisible();
  await expect(page.getByText('Preview')).toBeVisible();
});


// 7. Upload PNG image
test('Upload PNG for compression', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/compress-png');

  const fileInput = page.locator('input[type="file"]');

  // Upload PNG file
  await fileInput.setInputFiles('tests/files/test.png');

  await page.waitForTimeout(2000);
});


// 8. Screenshot
test('PNG Compressor screenshot', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/compress-png');

  await page.screenshot({ path: 'compress-png.png', fullPage: true });
});


// ================================
// GIF COMPRESSOR PAGE TESTS
// ================================

// 9. Open GIF Compressor page
test('Open GIF Compressor page', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/compress-gif');

  await expect(page.getByText('GIF Compressor')).toBeVisible();
});


// 10. Check UI elements
test('GIF Compressor UI elements', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/compress-gif');

  await expect(page.getByText('Select GIF')).toBeVisible();
  await expect(page.getByText('Preview')).toBeVisible();
});


// 11. Upload GIF file
test('Upload GIF for compression', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/compress-gif');

  const fileInput = page.locator('input[type="file"]');

  // Upload GIF file
  await fileInput.setInputFiles('tests/files/test.gif');

  await page.waitForTimeout(2000);
});


// 12. Screenshot
test('GIF Compressor screenshot', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/compress-gif');

  await page.screenshot({ path: 'compress-gif.png', fullPage: true });
});


