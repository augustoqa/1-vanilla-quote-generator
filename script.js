const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// Show Loading
function loading() {
	loader.hidden = false
	quoteContainer.hidden = true
}

// Hide Loading
function complete() {
	if (!loader.hidden) {
		quoteContainer.hidden = false
		loader.hidden = true
	}
}

// Get Quote From API
async function getQuote() {
	loading()
	const apiUrl = 'https://api.quotable.io/random'

	try {
		const response = await fetch(apiUrl)
		const data = await response.json()

		// Reduce font size for long quotes
		if (data.content.length > 50) {
			quoteText.classList.add('long-quote')
		} else {
			quoteText.classList.remove('long-quote')
		}

		authorText.innerText = data.author
		quoteText.innerText = data.content
		// Stop Loader, Show Quote
		complete()
	} catch (error) {
		console.log('whoops, no quote', error)
	}
}

// Tweet Quote
function tweetQuote() {
	const quote = quoteText.innerText
	const author = authorText.innerText
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
	window.open(twitterUrl, '_blank')
}

// Event Listener
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuote()