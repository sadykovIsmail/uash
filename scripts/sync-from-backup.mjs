import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const defaultBackupPath = path.resolve(
  rootDir,
  '..',
  'uzbekamericansh-org-20260524-215444-w8nupsn7n4lm.wpress',
)
const backupPath = path.resolve(process.argv[2] ?? defaultBackupPath)

const pagesDir = path.join(rootDir, 'pages')
const programEventsPath = path.join(pagesDir, 'program-and-events', 'index.html')
const fifaPagePath = path.join(pagesDir, 'fifa-2026', 'index.html')
const mirroredPagesPath = path.join(rootDir, '.mirrored-pages.json')

const filesToExtract = [
  {
    name: '1536x864_cmsv2_1e77959b-0178-5382-a8f2-646410ba25e1-9324195.webp',
    dir: path.join(rootDir, 'public', 'mirror', 'wp-content', 'uploads', '2026', '05'),
  },
  {
    name: 'Travel-Guide-Houston-FIFA-2026.pdf',
    dir: path.join(rootDir, 'public', 'mirror', 'wp-content', 'uploads', '2026', '05'),
  },
  {
    name: 'Travel-Guide-Houston-FIFA-2026-Uzb.pdf',
    dir: path.join(rootDir, 'public', 'mirror', 'wp-content', 'uploads', '2026', '05'),
  },
  {
    name: 'shared-frontend-handlers.03caa53373b56d3bab67.bundle.min.js',
    dir: path.join(rootDir, 'public', 'mirror', 'wp-content', 'plugins', 'elementor', 'assets', 'js'),
  },
  {
    name: 'text-editor.45609661e409413f1cef.bundle.min.js',
    dir: path.join(rootDir, 'public', 'mirror', 'wp-content', 'plugins', 'elementor', 'assets', 'js'),
  },
  {
    name: 'paypal-button.f4f64e46173f50701949.bundle.min.js',
    dir: path.join(rootDir, 'public', 'mirror', 'wp-content', 'plugins', 'elementor-pro', 'assets', 'js'),
  },
  {
    name: 'nav-menu.7e665d03657d48aef483.bundle.min.js',
    dir: path.join(rootDir, 'public', 'mirror', 'wp-content', 'plugins', 'elementor-pro', 'assets', 'js'),
  },
]

const routePairs = [
  ['https://uzbekamericansh.org/about-us/', '/about-us/'],
  ['https://uzbekamericansh.org/become-a-member/', '/become-a-member/'],
  ['https://uzbekamericansh.org/contact-us/', '/contact-us/'],
  ['https://uzbekamericansh.org/discover-uzbekistan/', '/discover-uzbekistan/'],
  ['https://uzbekamericansh.org/fifa-2026/', '/fifa-2026/'],
  ['https://uzbekamericansh.org/gallery/', '/gallery/'],
  ['https://uzbekamericansh.org/membership/', '/membership/'],
  ['https://uzbekamericansh.org/program-and-events/', '/program-and-events/'],
  ['https://uzbekamericansh.org/', '/'],
]

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function extractFile(buffer, file) {
  const marker = Buffer.from(file.name, 'utf8')
  const start = buffer.indexOf(marker)
  if (start === -1) {
    throw new Error('Could not locate ' + file.name + ' in backup')
  }

  const contentStart = start + marker.length + 1
  let next = buffer.indexOf(Buffer.from('wpress', 'utf8'), contentStart)
  if (next === -1) {
    next = buffer.length
  }

  let contentEnd = next
  while (contentEnd > contentStart && buffer[contentEnd - 1] === 0) {
    contentEnd -= 1
  }

  await fs.mkdir(file.dir, { recursive: true })
  const outputPath = path.join(file.dir, file.name)
  await fs.writeFile(outputPath, buffer.subarray(contentStart, contentEnd))
}

function localizeHtml(html) {
  let next = html

  for (const [remote, local] of routePairs) {
    next = next.replace(new RegExp(escapeRegExp(remote), 'g'), local)
  }

  next = next.replace(/https?:\/\/uzbekamericansh\.org\/(wp-content|wp-includes)\//g, '/mirror/$1/')
  next = next.replace(/https?:\/\/uzbekamericansh\.org(?=["'])/g, '/')
  next = next.replace(/<link rel="https:\/\/api\.w\.org\/"[\s\S]*?<meta name="generator" content="WordPress[^"]*"\s*\/?>/g, '<meta name="generator" content="WordPress 6.7.5" />')
  next = next.replace(/<link rel="canonical"[\s\S]*?oEmbed \(XML\)"[\s\S]*?>\s*/g, '')
  next = next.replace(/<!-- Page cached by LiteSpeed Cache[\s\S]*$/g, '')

  return next
}

function buildFifaPageBlock() {
  return `
		<div data-elementor-type="wp-page" data-elementor-id="2001" class="elementor elementor-2001" data-elementor-post-type="page">
			<div class="elementor-element elementor-element-fifa-page e-flex e-con-boxed e-con e-parent" data-id="fifa-page" data-element_type="container" data-e-type="container">
				<div class="e-con-inner">
					<div class="elementor-element elementor-element-fifa-main e-con-full e-flex e-con e-child" data-id="fifa-main" data-element_type="container" data-e-type="container">
						<div class="elementor-element elementor-widget elementor-widget-image" data-id="fifa-banner" data-element_type="widget" data-widget_type="image.default">
							<div class="elementor-widget-container">
								<img decoding="async" width="1536" height="864" src="/mirror/wp-content/uploads/2026/05/1536x864_cmsv2_1e77959b-0178-5382-a8f2-646410ba25e1-9324195.webp" alt="FIFA 2026 banner" style="width:100%;height:auto;border-radius:28px;" onerror="this.onerror=null;this.src='/images/fifa-2026.jpg';" />
							</div>
						</div>
						<div class="elementor-element elementor-widget elementor-widget-heading" data-id="fifa-title" data-element_type="widget" data-widget_type="heading.default">
							<div class="elementor-widget-container">
								<h1 class="elementor-heading-title elementor-size-default">FIFA 2026</h1>
							</div>
						</div>
						<div class="elementor-element elementor-widget elementor-widget-text-editor" data-id="fifa-copy" data-element_type="widget" data-widget_type="text-editor.default">
							<div class="elementor-widget-container">
								<p><strong>Uzbekistan at the FIFA World Cup 2026</strong></p>
								<p>Houston will proudly welcome Uzbekistan to the FIFA World Cup 2026, and the Uzbek American Society of Houston is preparing a warm, vibrant experience for fans arriving from near and far.</p>
								<p>Throughout the tournament, our organization will host special events, cultural gatherings, and family-friendly celebrations designed to make supporters feel at home while showcasing the richness of Uzbek hospitality.</p>
								<p>Whether you're visiting for the matches or living in Houston, we invite you to join us as we come together to cheer for our national team and celebrate this historic moment for Uzbekistan on the world stage.</p>
							</div>
						</div>
						<div class="elementor-element elementor-widget elementor-widget-image" data-id="fifa-poster" data-element_type="widget" data-widget_type="image.default">
							<div class="elementor-widget-container" style="max-width:280px;margin:0 auto;">
								<img decoding="async" width="273" height="505" src="/images/fifa-2026.jpg" alt="FIFA 2026 June - July, 2026" style="width:100%;height:auto;border-radius:28px;" />
							</div>
						</div>
						<div class="elementor-element elementor-widget elementor-widget-text-editor" data-id="fifa-guide-copy" data-element_type="widget" data-widget_type="text-editor.default">
							<div class="elementor-widget-container">
								<h2>What to Expect</h2>
								<ul>
									<li>Community watch parties and fan meetups</li>
									<li>Events highlighting Uzbek traditions, food, and music</li>
									<li>Guidance and local support for visitors coming to Houston</li>
								</ul>
								<h2>Local Guide for Uzbek Fans</h2>
								<p>To help make your stay easier, we have prepared local guides in English and Uzbek with travel tips and practical information for Houston during FIFA 2026.</p>
								<p><a href="/mirror/wp-content/uploads/2026/05/Travel-Guide-Houston-FIFA-2026.pdf" target="_blank" rel="noopener">In English</a></p>
								<p><a href="/mirror/wp-content/uploads/2026/05/Travel-Guide-Houston-FIFA-2026-Uzb.pdf" target="_blank" rel="noopener">In Uzbek (O'zbek tilida)</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`
}

async function updateProgramEventsPage() {
  let html = await fs.readFile(programEventsPath, 'utf8')
  html = localizeHtml(html)
  html = html.replace(
    /<a class="elementor-cta__button elementor-button elementor-size-md elementor-animation-grow" href="[^"]*">/g,
    '<a class="elementor-cta__button elementor-button elementor-size-md elementor-animation-grow" href="/fifa-2026/">',
  )
  html = html.replace(
    /<h3 class="elementor-heading-title elementor-size-default">(?:<a[^>]*>)?FIFA 2026 June<br>- July, 2026(?:<\/a>)?<\/h3>/,
    '<h3 class="elementor-heading-title elementor-size-default"><a href="/fifa-2026/" style="color:inherit;text-decoration:none;">FIFA 2026 June<br>- July, 2026</a></h3>',
  )
  await fs.writeFile(programEventsPath, html, 'utf8')
  return html
}

async function ensureFifaPage(programEventsHtml) {
  const pagePattern = /<div data-elementor-type="wp-page"[^>]*>[\s\S]*?(?=\s*<div data-elementor-type="footer")/
  const localized = localizeHtml(programEventsHtml)
  if (!pagePattern.test(localized)) {
    throw new Error('Could not locate Elementor page block in program-and-events page')
  }

  let fifaHtml = localized.replace(pagePattern, buildFifaPageBlock())
  fifaHtml = fifaHtml.replace(/<title>[\s\S]*?<\/title>/, '<title>FIFA 2026 &#8211; uzbekamericansh.org</title>')

  await fs.mkdir(path.dirname(fifaPagePath), { recursive: true })
  await fs.writeFile(fifaPagePath, fifaHtml, 'utf8')
}

async function updateMirroredPages() {
  const routes = new Set(JSON.parse(await fs.readFile(mirroredPagesPath, 'utf8')))
  routes.add('fifa-2026/index.html')
  const ordered = [...routes].sort((a, b) => a.localeCompare(b))
  await fs.writeFile(mirroredPagesPath, `${JSON.stringify(ordered, null, 2)}\n`, 'utf8')
}

async function main() {
  await fs.access(backupPath)
  const buffer = await fs.readFile(backupPath)

  for (const file of filesToExtract) {
    await extractFile(buffer, file)
  }

  const programEventsHtml = await updateProgramEventsPage()
  await ensureFifaPage(programEventsHtml)
  await updateMirroredPages()

  console.log(`Synced local mirror updates from backup: ${backupPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
