export default function FpsCtrl(fps, callback) {

    var delay = 1000 / fps,
        time = null,
        frame = -1,
        tref;

    this.isRunning = false;

    function loop(timestamp) {
        if (time === null) time = timestamp;
        let seg = Math.floor((timestamp - time) / delay);
        if (seg > frame) {
            frame = seg;
            callback({time: timestamp, frame: frame});
        }
        tref = requestAnimationFrame(loop)
    }

    this.run = function () {
        if (!this.isRunning) {
            this.isRunning = true;
            tref = requestAnimationFrame(loop);
        }
    };

};
