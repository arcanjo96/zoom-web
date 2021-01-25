class Business {
    constructor({ room, media, view, socketBuilder }) {
        this.media = media;
        this.room = room;
        this.view = view;

        this.socketBuilder = socketBuilder
            .setOnUserConnected(this.onUserConnected())
            .setOnUserDisconnected(this.onUserDisconnected())
            .build();
        this.socketBuilder.emit('join-room', this.room, 'lucas01');
        this.currentStream = {};
    }

    static initialize(dependencies) {
        const instanceOfBusiness = new Business(dependencies);
        return instanceOfBusiness._init();
    }

    async _init() {
        this.currentStream = await this.media.getCamera();
        this.addVideoStream('lucas');
    }

    addVideoStream(userId, stream = this.currentStream) {
        const isCurrentId = false;
        this.view.renderVideo({
            userId,
            stream,
            isCurrentId
        });
    }

    onUserConnected = function () {
        return userId => {
            console.log('user connected!', userId);
        }
    }

    onUserDisconnected = function () {
        return userId => {
            console.log('user disconnected!', userId);
        }
    }
}