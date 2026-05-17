import { access, mkdir, writeFile } from 'node:fs/promises';

const outputRoot = new URL('../public/assets/images/cooking/', import.meta.url);

const images = [
  { id: 'curry-rice', fileName: 'Beef curry rice 003.jpg' },
  { id: 'omurice', fileName: 'Omurice.jpg' },
  { id: 'hamburg-steak', fileName: 'Hamburg steak.jpg' },
  { id: 'spaghetti', fileName: 'Cooked spaghetti.jpg' },
  { id: 'pizza', fileName: 'Pizza.jpg' },
  { id: 'onigiri', fileName: 'Onigiri 001.jpg' },
  { id: 'sandwich', fileName: 'Sandwich (1).jpg' },
  { id: 'udon', fileName: 'Udon (Kitsune udon).jpg' },
  { id: 'ramen', fileName: 'Bowl of ramen.jpg' },
  { id: 'takoyaki', fileName: 'A Takoyaki.jpg' },
];

function commonsFileUrl(fileName) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=640`;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function exists(url) {
  try {
    await access(url);
    return true;
  } catch {
    return false;
  }
}

async function downloadImage(image) {
  const url = commonsFileUrl(image.fileName);

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'dore-quiz-image-downloader/1.0 (local asset preparation)',
      },
    });

    if (response.status === 429 && attempt < 5) {
      const waitMs = attempt * 7000;
      console.log(`Rate limited for ${image.fileName}. Retrying in ${waitMs / 1000}s...`);
      await sleep(waitMs);
      continue;
    }

    if (!response.ok) {
      throw new Error(`Failed to download ${image.fileName}: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.startsWith('image/')) {
      throw new Error(`Unexpected content type for ${image.fileName}: ${contentType}`);
    }

    return Buffer.from(await response.arrayBuffer());
  }

  throw new Error(`Failed to download ${image.fileName}`);
}

await mkdir(outputRoot, { recursive: true });

for (const image of images) {
  const outputUrl = new URL(`${image.id}.jpg`, outputRoot);
  if (await exists(outputUrl)) {
    console.log(`Skipped ${image.id}.jpg`);
    continue;
  }

  const bytes = await downloadImage(image);
  await writeFile(outputUrl, bytes);
  console.log(`Saved ${image.id}.jpg from ${image.fileName}`);
  await sleep(2500);
}
