(function() {
    const TIME_TO_AUTO_HIDE = 5000;
    const PERCENT_TO_CHECK1 = 50;
    const PERCENT_TO_CHECK2 = 80;
    const setupInterval = setInterval(waitInit, 500);
    let removerTimeout;
    let container;
    let button;
    let video;
    function waitInit() {
        video = document.querySelector('video.video-stream');
        if (video) {
            setup()
            clearInterval(setupInterval);
        }
    }

    function setup() {
        createButton();
        showRemainder();
        setupRemainderRemover();
        appendKeymap();

        setInterval(function() {
            if (videoProgressIn(PERCENT_TO_CHECK1) || videoProgressIn(PERCENT_TO_CHECK2)) {
                showMessageIfNecessary();
            }
        }, 300);
    }

    function showMessageIfNecessary() {
        if (!alreadyLiked()) {
            showRemainder();
            setupRemainderRemover();
        }
        else
            hideRemainder();
    }

    function alreadyLiked() {
        return getThumbsupButton().classList.contains('style-default-active');
    }

    function videoProgressIn(percent) {
        const currentPercent = video.currentTime / video.duration * 100;
        return currentPercent >= (percent - 1) && currentPercent <= (percent + 1);
    }

    function createButton() {
        container = document.createElement("div");
        container.id = "youtube_liker_container";
        container.style.display = 'none';
        container.style.position = 'absolute';
        container.style.top = '30px';
        container.style.left = '30px';
        container.style.background = 'rgba(255, 255, 255, 0.5)';
        container.style.fontSize = '18px';
        container.style.padding = '5px';
        container.style.cursor = 'pointer';

        container.innerText = 'Youtube Liker Remainder:\nPress "V" or click here to Like the video.';
        container.prepend(getThumbsupIcon());
        container.onclick = thumbsup;
        document.querySelector('#movie_player').parentElement.append(container);
    }

    function setupRemainderRemover() {
        if (removerTimeout) clearTimeout(removerTimeout);

        removerTimeout = setTimeout(function() {
            hideRemainder();
        }, TIME_TO_AUTO_HIDE);
    }

    function showRemainder() {
        container.style.display = 'block';
    }

    function hideRemainder() {
        container.style.display = 'none';
    }

    function appendKeymap() {
        document.body.onkeyup = function(e) {
            if (e.key === 'v' && !alreadyLiked()) {
                thumbsup();
            }
        }
    }

    function thumbsup() {
        const likeButton = getThumbsupButton();
        if (likeButton) {
            likeButton.click();
            container.remove();
        }
    }

    function getThumbsupButton() {
        return document.querySelector('#menu-container ytd-toggle-button-renderer:first-child');
    }

    function getThumbsupIcon() {
        return document.querySelector('#menu-container ytd-toggle-button-renderer:first-child yt-icon');
    }
})();
