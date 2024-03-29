/* Binaural Beat object */
export var BinauralBeat = (function () {

    /* Wavetype */
    BinauralBeat.SINE = 'sine';

    BinauralBeat.SQUARE = 'square';

    BinauralBeat.SAWTOOTH = 'sawtooth';

    BinauralBeat.TRIANGLE = 'triangle';

    /* Set parameters */
    function BinauralBeat(ctx, options) {
        var _ref, _ref1, _ref2, _ref3;
        this.input = ctx.createGain();
        this.output = ctx.createGain();
        options = options != null ? options : {};
        this.pitch = (_ref = options.pitch) != null ? _ref : 440;
        this.beatRate = (_ref1 = options.beats) != null ? _ref1 : 5;
        this.waveType = (_ref2 = options.waveType) != null ? _ref2 : this.constructor.SINE;
        this.compressNodes = (_ref3 = options.compressNodes) != null ? _ref3 : false;
        this.started = false;
        this._createInternalNodes(ctx);
        this._routeNodes();
        this.setPitch(this.pitch);
        this.setWaveType(this.waveType);
    }

    /* Connect player to left and right audio channels */
    BinauralBeat.prototype._createInternalNodes = function (ctx) {
        this.leftChannel = ctx.createOscillator();
        this.rightChannel = ctx.createOscillator();
        this.channelMerger = ctx.createChannelMerger();
        return this.compressor = ctx.createDynamicsCompressor();
    };

    /* Compress nodes */
    BinauralBeat.prototype._routeNodes = function () {
        if (this.compressNodes) {
            this.input.connect(this.compressor);
            this.channelMerger.connect(this.compressor);
            return this.compressor.connect(this.output);
        } else {
            this.input.connect(this.output);
            return this.channelMerger.connect(this.output);
        }
    };

    /* Start Oscillators */
    BinauralBeat.prototype._startOscillators = function () {
        this.leftChannel.start(0);
        return this.rightChannel.start(0);
    };

    /* Connect Oscillators */
    BinauralBeat.prototype._connectOscillators = function () {
        this.leftChannel.connect(this.channelMerger, 0, 0);
        return this.rightChannel.connect(this.channelMerger, 0, 1);
    };

    /* Disconnect Oscillators */
    BinauralBeat.prototype._disconnectOscillators = function () {
        this.leftChannel.disconnect();
        return this.rightChannel.disconnect();
    };

    /* Calculate Frequency */
    BinauralBeat.prototype._getChannelFrequency = function (channelNum) {
        var channelFrequency, frequencyOffset;
        frequencyOffset = this.beatRate / 2;
        if (channelNum === 0) {
            channelFrequency = this.pitch - frequencyOffset;
        } else {
            channelFrequency = this.pitch + frequencyOffset;
        }
        return channelFrequency;
    };

    /* Get Channel */
    BinauralBeat.prototype.getChannel = function (channel) {
        if (channel === 0) {
            return this.leftChannel;
        } else if (channel === 1) {
            return this.rightChannel;
        }
    };

    /* Set Pitch  */
    BinauralBeat.prototype.setPitch = function (pitchFreq) {
        this.pitch = pitchFreq;
        this.leftChannel.frequency.value = this._getChannelFrequency(0);
        return this.rightChannel.frequency.value = this._getChannelFrequency(1);
    };

    /* Set Beat Rate */
    BinauralBeat.prototype.setBeatRate = function (beatRate) {
        this.beatRate = beatRate;
        return this.setPitch(this.pitch);
    };

    /* Set Wave Type (Sine wave) */
    BinauralBeat.prototype.setWaveType = function (waveType) {
        this.waveType = waveType;
        return this.leftChannel.type = this.rightChannel.type = this.waveType;
    };

    /* Set periodic wave */
    BinauralBeat.prototype.setPeriodicWave = function (periodicWave) {
        this.leftChannel.setPeriodicWave(periodicWave);
        return this.rightChannel.setPeriodicWave(periodicWave);
    };

    /* Start the oscillators */
    BinauralBeat.prototype.start = function () {
        if (!this.started) {
            this._startOscillators();
            this.started = true;
        }
        return this._connectOscillators();
    };

    /* Stop the oscillators */
    BinauralBeat.prototype.stop = function () {
        return this._disconnectOscillators();
    };

    /* Connnect to output */
    BinauralBeat.prototype.connect = function (dest) {
        return this.output.connect(dest.input ? dest.input : dest);
    };

    /* Disconnect from output */
    BinauralBeat.prototype.disconnect = function () {
        return this.output.disconnect();
    };

    return BinauralBeat;

})();

