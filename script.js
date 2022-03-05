const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

function showLoadingSpinner() {
	loader.hidden = false
	quoteContainer.hidden = true
}

function removeLoadingSpinner() {
	if (!loader.hidden) {
		quoteContainer.hidden = false
		loader.hidden = true
	}
}

async function getQuoteFromAPI() {
	showLoadingSpinner()
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
		
		removeLoadingSpinner()
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
newQuoteBtn.addEventListener('click', getQuoteFromAPI)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuoteFromAPI()