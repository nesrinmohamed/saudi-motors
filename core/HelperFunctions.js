



export default {

    fromSecondsToMinutes(seconds) {

        let minutes = (parseInt(seconds) / 60).toFixed(2);

        minutes = minutes < 10 ? '0' + minutes : minutes;

        return minutes.replace('.', ':');

    },
    infinityScroll(callback) {
        const observer = new IntersectionObserver(entries => {

            if (entries[0].intersectionRatio <= 0) return;

            callback()

        })
        


        return {
            observe: (target) => {
                observer.observe(target);
            },
            disconnect: () => {
                observer.disconnect();
            }
        }
    }
}