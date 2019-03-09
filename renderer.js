const remote = require('electron').remote;

(function handleWindowControls() {
    document.onreadystatechange = () => {
        if(document.readyState == 'complete') {
            init();
        }
    };

    function init() {
        let window = remote.getCurrentWindow();
        const pinButton = document.getElementById('pin-button'),
              unpinButton = document.getElementById('unpin-button'),
              minButton = document.getElementById('min-button'),
              maxButton = document.getElementById('max-button'),
              restoreButton = document.getElementById('restore-button'),
              closeButton = document.getElementById('close-button');
              goButton = document.getElementById('go-button');
              videoInput = document.getElementById('video-input');

        pinButton.addEventListener('click', event => {
            window = remote.getCurrentWindow();
            window.setAlwaysOnTop(true);
            togglePinButtons();
        });

        unpinButton.addEventListener('click', event => {
            window = remote.getCurrentWindow();
            window.setAlwaysOnTop(false);
            togglePinButtons();
        });

        minButton.addEventListener('click', event => {
            window = remote.getCurrentWindow();
            window.minimize();
        });

        maxButton.addEventListener('click', event => {
            window = remote.getCurrentWindow();
            window.maximize();
            toggleMaxRestoreButtons();
        });

        restoreButton.addEventListener('click', event => {
            window = remote.getCurrentWindow();
            window.unmaximize();
            toggleMaxRestoreButtons();
        });

        togglePinButtons();
        window.on('always-on-top-changed', togglePinButtons);
        
        toggleMaxRestoreButtons();
        window.on('maximize', toggleMaxRestoreButtons);
        window.on('unmaximize', toggleMaxRestoreButtons);

        closeButton.addEventListener('click', event => {
            window = remote.getCurrentWindow();
            window.close();
        });

        function toggleMaxRestoreButtons() {
            window = remote.getCurrentWindow();
            if(window.isMaximized()) {
                maxButton.style.display = 'none';
                restoreButton.style.display = 'flex';
            } else {
                maxButton.style.display = 'flex';
                restoreButton.style.display = 'none';
            }
        }

        function togglePinButtons() {
            window = remote.getCurrentWindow();
            if(window.isAlwaysOnTop()) {
                pinButton.style.display = 'none';
                unpinButton.style.display = 'flex';
            } else {
                pinButton.style.display = 'flex';
                unpinButton.style.display = 'none';
            }
        }

        goButton.addEventListener('click', event => {
            let inputValue = document.getElementById('video-input').value;

            if(!inputValue.match(/\S/)) {
                return;
            }

            let video = document.getElementById('yt-video');
            let parent = document.getElementById('container');

            let videoId = inputValue.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            videoId = videoId == null ? inputValue : videoId[1];
            video.src = "https://www.youtube.com/embed/"+ videoId +"?autoplay=1&modestbranding=0;&rel=0&showinfo=0";
            parent.removeChild(parent.childNodes[0]);
            parent.appendChild(video);

            document.getElementById('video-input').value = "";
        });

        videoInput.addEventListener('keyup', event => {
            if(event.keyCode === 13) {
                event.preventDefault();
                goButton.click();
            }
        });
    }
}) ();