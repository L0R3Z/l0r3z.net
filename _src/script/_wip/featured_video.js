const videos = [
    {
        name: "Two time by RAMDARAM",
        id: "_LLCz1FCWrY"
    },
    {
        name: "Ena Dream BBC Trailer",
        id: "qLurAhsqXWc"
    },
    {
        name: "Ghost Of The Year",
        id: "1KxLntBdKQI"
    },
    {
        name: "Captain Yajima by Worthikids",
        id: "l-TJm7HkzkQ"
    },
    {
        name: "Ena Extinction Party",
        id: "Td7CBNu0914"
    },
    {
        name: "Wire",
        id: "kGj_HkKhhSE"
    },
    {
        name: "Playground Trailer",
        id: "P8U22dvli4w"
    },
    {
        name: "Spend A Day In Tokyo With Me",
        id: "X-G6yFhL4ps"
    }
]

const iframe = document.querySelector('#featuredvideo iframe');
const currentVideoId = videos[Math.floor(Math.random() * videos.length)].id;
iframe.src = `https://www.youtube.com/embed/${currentVideoId}?autohide=1&modestbranding=1&rel=0&showinfo=0&controls=1`;