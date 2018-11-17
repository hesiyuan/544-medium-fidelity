console.log("augment js connected");
let augmenter = {

  doLoad: function() {
    this.video = document.getElementById('video');
    this.c1 = document.getElementById("c1");
    this.ctx1 = this.c1.getContext("2d");
    this.c2 = document.getElementById('c2');
    this.ctx2 = this.c2.getContext('2d');
    let self = this;
    this.video.addEventListener('play', function() {
        self.width = self.video.videoWidth/2;
        self.height = self.video.videoHeight/2;
        self.timerCallback();
      }, false);
  },

  timerCallback: function() {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    let self = this;
    setTimeout(function() {
        self.timerCallback();
      }, 0); //  In the real world, you would probably schedule this 
                 //to be done based on knowledge of the video's frame rate.
  },

    computeFrame: function() {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height); // draw image onto canvas
    let frame = this.ctx1.getImageData(0, 0, this.width, this.height); // get data from canvas
    let l = frame.data.length / 4;

    for (let i = 0; i < l; i++) { // converts to grayscale image
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      var brightness = (3*r+4*g+b)>>>3;
      frame.data[i * 4 + 0] = brightness;
      frame.data[i * 4 + 1] = brightness;
      frame.data[i * 4 + 2] = brightness;
    }
    this.ctx2.putImageData(frame, 0, 0);
    return;
  }

};


document.addEventListener("DOMContentLoaded", () => {
augmenter.doLoad();

});