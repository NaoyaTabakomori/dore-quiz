import { access, mkdir, writeFile } from 'node:fs/promises';

const groups = {
  fruits: [
    { id: 'apple', files: ['Red Apple.jpg', 'Red apple.jpg'] },
    { id: 'banana', files: ['Bananas.jpg', 'Cavendish banana DSC04291.jpg'] },
    { id: 'orange', files: ['Orange-Fruit-Pieces.jpg', 'Oranges - whole-halved-segment.jpg'] },
    { id: 'grape', files: ['Table grapes on white.jpg', 'Wine grapes03.jpg'] },
    { id: 'strawberry', files: ['Strawberry BNC.jpg', 'Fragaria x ananassa close-up.JPG'] },
    { id: 'melon', files: ['Cantaloupe.jpg', 'Cantaloupe Melon cross section.png', 'Melon.jpg'] },
    { id: 'watermelon', files: ['Watermelon.jpg', 'Watermelon cross section.jpg'] },
    { id: 'peach', files: ['Autumn Red peaches.jpg', 'Peach and cross section.jpg'] },
    { id: 'pineapple', files: ['Pineapple and cross section.jpg', 'Pineapple.jpg'] },
    { id: 'pear', files: ['Pear DS.jpg', 'Doyenne du Comice pear.jpg'] },
  ],
  animals: [
    { id: 'zebra', files: ['Plains Zebra Equus quagga.jpg', 'Zebra Botswana edit02.jpg'] },
    { id: 'lion', files: ['Lion waiting in Namibia.jpg', 'Panthera leo male.jpg'] },
    { id: 'giraffe', files: ['Giraffe standing.jpg', 'Giraffe Ithala KZN South Africa Luca Galuzzi 2004.JPG'] },
    { id: 'elephant', files: ['African Bush Elephant.jpg', 'African elephant warning raised trunk.jpg'] },
    { id: 'panda', files: ['Grosser Panda.JPG', 'Ailuropoda melanoleuca qinlingensis.jpg'] },
    { id: 'hippo', files: ['Hippopotamus.jpg', 'Hippopotamus - 04.jpg', 'Hippo pod edit.jpg'] },
    { id: 'rabbit', files: ['Oryctolagus cuniculus Tasmania 2.jpg', 'Rabbit in montana.jpg'] },
    { id: 'dog', files: ['YellowLabradorLooking new.jpg', 'Golden Retriever standing Tucker.jpg'] },
    { id: 'cat', files: ['Orange Tabby Full Body.JPG', 'Domestic Cat.jpg', 'Cat August 2010-4.jpg'] },
    { id: 'penguin', files: ['Aptenodytes forsteri -Snow Hill Island, Antarctica -adults and juvenile-8.jpg', 'Penguin in Antarctica jumping out of the water.jpg'] },
  ],
  vegetables: [
    { id: 'carrot', files: ['Carrots.jpg', 'CarrotDiversityLg.jpg'] },
    { id: 'tomato', files: ['Tomato je.jpg', 'Tomatoes plain and sliced.jpg'] },
    { id: 'cucumber', files: ['Sliced Cucumber.jpg', 'Chopped Cucumber.jpg', 'Cucumber.jpg'] },
    { id: 'potato', files: ['Potato and cross section.jpg', 'Potato.jpg'] },
    { id: 'onion', files: ['Onion on White.JPG', 'Mixed onions.jpg'] },
    { id: 'pumpkin', files: ['Kabocha coupé.JPG', 'Cucurbita kabocha o kabutiá o tipo Tetsukabuto 2 zapallos cáscara.jpg', 'Pumpkin.jpg'] },
    { id: 'eggplant', files: ['Aubergine.jpg', 'Eggplant.jpg'] },
    { id: 'cabbage', files: ['Cabbage and cross section on white.jpg', 'Cabbage.jpg'] },
    { id: 'corn', files: ['Yellow Corn on the Cob (35115370841).jpg', 'Zea mays corn cob.jpg', 'Corncobs.jpg'] },
    { id: 'broccoli', files: ['Broccoli and cross section edit.jpg', 'Broccoli bunch.jpg'] },
  ],
};

const root = new URL('../public/assets/images/', import.meta.url);
const forceIds = new Set(process.argv.slice(2));

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function commonsFileUrl(fileName) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=960`;
}

async function exists(url) {
  try {
    await access(url);
    return true;
  } catch {
    return false;
  }
}

async function fetchImage(fileName) {
  const url = commonsFileUrl(fileName);

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'dore-quiz-image-downloader/1.0 (local asset preparation)',
      },
    });

    if (response.status === 429 && attempt < 5) {
      const waitMs = attempt * 7000;
      console.log(`Rate limited for ${fileName}. Retrying in ${waitMs / 1000}s...`);
      await sleep(waitMs);
      continue;
    }

    if (!response.ok) {
      console.log(`Failed ${fileName}: ${response.status} ${response.statusText}`);
      return null;
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.startsWith('image/')) {
      console.log(`Skipped ${fileName}: ${contentType}`);
      return null;
    }

    return Buffer.from(await response.arrayBuffer());
  }

  return null;
}

for (const [groupId, images] of Object.entries(groups)) {
  const outputRoot = new URL(`${groupId}/`, root);
  await mkdir(outputRoot, { recursive: true });

  for (const image of images) {
    const outputUrl = new URL(`${image.id}.jpg`, outputRoot);
    if (!forceIds.has(image.id) && await exists(outputUrl)) {
      console.log(`Skipped ${groupId}/${image.id}.jpg`);
      continue;
    }

    let saved = false;
    for (const fileName of image.files) {
      const bytes = await fetchImage(fileName);
      if (!bytes) {
        continue;
      }

      await writeFile(outputUrl, bytes);
      console.log(`Saved ${groupId}/${image.id}.jpg from ${fileName}`);
      saved = true;
      await sleep(2200);
      break;
    }

    if (!saved) {
      throw new Error(`Could not download ${groupId}/${image.id}`);
    }
  }
}
