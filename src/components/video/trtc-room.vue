<!-- @format -->

<template>
    <view
        :class="[
            'trtc-room-container',
            isFullscreenDevice ? 'fullscreen-device-fix' : ''
        ]"
    >
        <view class="template-grid">
            <view class="column-layout">
                <view class="column-1">
                    <view
                        class="grid-scroll-container"
                        @touchstart="_handleGridTouchStart"
                        @touchend="_handleGridTouchEnd"
                    >
                        <!-- <view id="grid-container-id" class="grid-container {{visibleStreamList.length < 4 ? 'stream-' + visibleStreamList.length : visibleStreamList.length%2 == 0? 'stream-odd':'stream-even'}}"> -->
                        <view
                            id="grid-container-id"
                            :class="[
                                'grid-container',
                                visibleStreamListLength < 4
                                    ? 'stream-' + visibleStreamListLength
                                    : 'stream-3'
                            ]"
                        >
                            <view
                                :class="[
                                    'view-container',
                                    'pusher-container',
                                    pusher.isVisible &&
                                    ((gridCurrentPage === 1 &&
                                        gridPlayerPerPage > 3) ||
                                        gridPlayerPerPage < 4)
                                        ? ''
                                        : 'none'
                                ]"
                            >
                                <live-pusher
                                    class="pusher"
                                    :url="pusher.url"
                                    :mode="pusher.mode"
                                    :autopush="pusher.autopush"
                                    :enable-camera="pusher.enableCamera"
                                    :enable-mic="pusher.enableMic"
                                    :muted="!pusher.enableMic"
                                    :enable-agc="pusher.enableAgc"
                                    :enable-ans="pusher.enableAns"
                                    :enable-ear-monitor="
                                        pusher.enableEarMonitor
                                    "
                                    :auto-focus="pusher.enableAutoFocus"
                                    :zoom="pusher.enableZoom"
                                    :min-bitrate="pusher.minBitrate"
                                    :max-bitrate="pusher.maxBitrate"
                                    :video-width="pusher.videoWidth"
                                    :video-height="pusher.videoHeight"
                                    :beauty="pusher.beautyLevel"
                                    :whiteness="pusher.whitenessLevel"
                                    :orientation="pusher.videoOrientation"
                                    :aspect="pusher.videoAspect"
                                    :device-position="pusher.frontCamera"
                                    :remote-mirror="pusher.enableRemoteMirror"
                                    :local-mirror="pusher.localMirror"
                                    :background-mute="
                                        pusher.enableBackgroundMute
                                    "
                                    :audio-quality="pusher.audioQuality"
                                    :audio-volume-type="pusher.audioVolumeType"
                                    :audio-reverb-type="pusher.audioReverbType"
                                    :waiting-image="pusher.waitingImage"
                                    :debug="debug"
                                    :beauty-style="pusher.beautyStyle"
                                    :filter="pusher.filter"
                                    @statechange="_pusherStateChangeHandler"
                                    @netstatus="_pusherNetStatusHandler"
                                    @error="_pusherErrorHandler"
                                    @bgmstart="_pusherBGMStartHandler"
                                    @bgmprogress="_pusherBGMProgressHandler"
                                    @bgmcomplete="_pusherBGMCompleteHandler"
                                    @audiovolumenotify="
                                        _pusherAudioVolumeNotify
                                    "
                                />
                                <view
                                    class="no-video"
                                    v-if="!pusher.enableCamera"
                                    ><image
                                        class="image"
                                        src="/static/wx/video/mute-camera-white.png"
                                    ></image
                                ></view>
                                <!-- <view class="no-audio" v-if="{{!pusher.enableMic}}">
	                  <image class="image" src="./static/mute-mic-white.png"></image>
	                </view>
	                <view class="audio-volume" v-if="{{pusher.enableMic}}">
	                  <image class="image" src="./static/micro-open.png"></image>
	                  <view class="audio-active" style="height:{{pusher.volume}}%">
	                    <image class="image" src="./static/audio-active.png"></image>
	                  </view>
	                </view> -->
                            </view>

                            <view
                                v-for="(item, index) in visibleStreamList"
                                :key="item.streamID"
                                :class="{
                                    'view-container': true,
                                    'player-container': true,
                                    none: !item.isVisible
                                }"
                                :id="'player-' + item.streamID"
                                :data-userid="item.userID"
                                :data-streamtype="item.streamType"
                                @tap="_doubleTabToggleFullscreen"
                            >
                                <live-player
                                    class="player"
                                    :id="item.streamID"
                                    :data-userid="item.userID"
                                    :data-streamid="item.streamID"
                                    :data-streamtype="item.streamType"
                                    :src="item.src"
                                    mode="RTC"
                                    :autoplay="item.autoplay"
                                    :mute-audio="item.muteAudio"
                                    :mute-video="item.muteVideo"
                                    :orientation="item.orientation"
                                    :object-fit="item.objectFit"
                                    :background-mute="item.enableBackgroundMute"
                                    :min-cache="item.minCache"
                                    :max-cache="item.maxCache"
                                    :sound-mode="item.soundMode"
                                    :enable-recv-message="
                                        item.enableRecvMessage
                                    "
                                    :auto-pause-if-navigate="
                                        item.autoPauseIfNavigate
                                    "
                                    :auto-pause-if-open-native="
                                        item.autoPauseIfOpenNative
                                    "
                                    :debug="debug"
                                    @statechange="_playerStateChange"
                                    @fullscreenchange="_playerFullscreenChange"
                                    @netstatus="_playerNetStatus"
                                    @audiovolumenotify="
                                        _playerAudioVolumeNotify
                                    "
                                />
                                <view class="no-video" v-if="item.muteVideo">
                                    <image
                                        class="image"
                                        src="/static/wx/video/display-pause-white.png"
                                    ></image>
                                    <view class="text">
                                        <p>{{ item.userName }}</p>
                                    </view>
                                </view>
                                <view
                                    class="no-video"
                                    v-if="!item.hasVideo && !item.muteVideo"
                                >
                                    <image
                                        class="image"
                                        src="/static/wx/video/mute-camera-white.png"
                                    ></image>
                                    <view class="text">
                                        <p>{{ item.userName }}</p>
                                    </view>
                                    <view class="text"
                                        ><p>对方摄像头未打开</p></view
                                    >
                                </view>
                                <view class="no-audio" v-if="!item.hasAudio"
                                    ><image
                                        class="image"
                                        src="/static/wx/video/mute-mic-white.png"
                                    ></image
                                ></view>
                                <view class="audio-volume" v-if="item.hasAudio">
                                    <image
                                        class="image"
                                        src="/static/wx/video/micro-open.png"
                                    ></image>
                                    <view
                                        class="audio-active"
                                        :style="{ height: item.volume + '%' }"
                                        ><image
                                            class="image"
                                            src="/static/wx/video/audio-active.png"
                                        ></image
                                    ></view>
                                </view>
                                <view class="operation-bar">
                                    <view class="operation-item-container">
                                        <view
                                            class="operation-item"
                                            catchtap="_handleSubscribeRemoteAudio"
                                            :data-user-i-d="item.userID"
                                            :data-stream-type="item.streamType"
                                        >
                                            <image
                                                class="item-image"
                                                :src="
                                                    item.muteAudio
                                                        ? '/static/wx/video/speaker-false.png'
                                                        : '/static/wx/video/speaker-white.png'
                                                "
                                            ></image>
                                        </view>
                                        <view
                                            class="operation-item"
                                            catchtap="_handleSubscribeRemoteVideo"
                                            :data-user-i-d="item.userID"
                                            :data-stream-type="item.streamType"
                                        >
                                            <image
                                                class="item-image"
                                                :src="
                                                    item.muteVideo
                                                        ? '/static/wx/video/display-pause-false.png'
                                                        : '/static/wx/video/display-play-white.png'
                                                "
                                            ></image>
                                        </view>
                                        <view
                                            class="operation-item"
                                            @tap="_toggleFullscreen"
                                            :data-user-i-d="item.userID"
                                            :data-stream-type="item.streamType"
                                        >
                                            <image
                                                class="item-image"
                                                src="/static/wx/video/fullscreen-white.png"
                                            ></image>
                                        </view>
                                    </view>
                                </view>
                            </view>

                            <view
                                v-for="(
                                    item, index
                                ) in gridPagePlaceholderStreamList"
                                :key="item.id"
                                class="
                                    view-container
                                    player-container player-placeholder
                                "
                            >
                                <image
                                    class="image"
                                    src="/static/wx/video/mute-camera-white.png"
                                ></image>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="column-2">
                    <view class="menu" v-if="!isShowMoreMenu">
                        <view class="menu-item" @tap="_switchSettingPanel"
                            ><image
                                class="image"
                                src="/static/wx/video/setting-white.png"
                            ></image
                        ></view>
                        <view class="menu-item" @tap="_switchMemberListPanel"
                            ><image
                                class="image"
                                src="/static/wx/video/list-white.png"
                            ></image
                        ></view>
                        <view class="menu-item" @tap="_hangUp"
                            ><image
                                class="image"
                                src="/static/wx/video/hangup-red.png"
                            ></image
                        ></view>
                        <!--						<view class="menu-item" @tap="_toggleIMPanel"><image class="image" :src="enableIM? '/static/wx/video/im-white.png': '/static/wx/video/im-disable.png'"></image></view>-->
                    </view>
                </view>
            </view>

            <view class="pages-container" v-if="gridPageCount > 1">
                <view
                    v-for="(item, index) in gridPageCount"
                    :key="item"
                    :class="[
                        'page-item',
                        index + 1 === gridCurrentPage ? 'current' : ''
                    ]"
                ></view>
            </view>
            <view
                :class="[
                    'panel',
                    'memberlist-panel',
                    panelName === 'memberlist-panel' ? '' : 'none'
                ]"
            >
                <view @tap="_handleMaskerClick" class="close-btn">X</view>
                <view class="panel-header">成员列表</view>
                <view class="panel-body">
                    <view class="panel-tips" v-if="streamList.length === 0"
                        >暂无成员</view
                    >
                    <scroll-view class="scroll-container" scroll-y="true">
                        <view
                            class="member-item"
                            v-for="(item, index) in streamList"
                            :key="item.streamID"
                        >
                            <view class="member-id">{{ item.userName }}</view>
                            <view class="member-btns">
                                <button
                                    class="btn"
                                    hover-class="btn-hover"
                                    :data-userid="item.userID"
                                    :data-streamtype="item.streamType"
                                    data-key="objectFit"
                                    data-value="fillCrop|contain"
                                    @tap="_setPlayerProperty"
                                >
                                    {{
                                        item.objectFit === 'fillCrop'
                                            ? '填充'
                                            : '适应'
                                    }}
                                </button>
                                <button
                                    class="btn"
                                    hover-class="btn-hover"
                                    :data-userid="item.userID"
                                    :data-streamtype="item.streamType"
                                    data-key="orientation"
                                    data-value="vertical|horizontal"
                                    @tap="_setPlayerProperty"
                                >
                                    {{
                                        item.orientation === 'vertical'
                                            ? '竖屏'
                                            : '横屏'
                                    }}
                                </button>
                                <button
                                    class="btn"
                                    hover-class="btn-hover"
                                    :data-userid="item.userID"
                                    :data-streamtype="item.streamType"
                                    @tap="_switchStreamType"
                                    v-if="item.streamType === 'main'"
                                >
                                    {{
                                        item._definitionType === 'small'
                                            ? '小画面'
                                            : '主画面'
                                    }}
                                </button>
                                <button
                                    class="btn"
                                    hover-class="btn-hover"
                                    :data-userid="item.userID"
                                    :data-streamtype="item.streamType"
                                    @tap="_handleSnapshotClick"
                                >
                                    截屏
                                </button>
                            </view>
                        </view>
                    </scroll-view>
                </view>
            </view>
            <view
                :class="[
                    'panel',
                    'setting-panel',
                    panelName === 'setting-panel' ? '' : 'none'
                ]"
            >
                <view @tap="_handleMaskerClick" class="close-btn">X</view>
                <view class="panel-header">推流设置</view>
                <view class="panel-body">
                    <scroll-view class="scroll-container" scroll-y="true">
                        <view class="setting-option">
                            <view class="label">启用摄像头</view>
                            <view class="btn-normal" @tap="_toggleVideo">
                                <image
                                    class="btn-image"
                                    :src="
                                        pusher.enableCamera
                                            ? '/static/wx/video/camera-true.png'
                                            : '/static/wx/video/camera-false.png'
                                    "
                                ></image>
                            </view>
                        </view>
                        <view class="setting-option">
                            <view class="label">启用麦克风</view>
                            <view class="btn-normal" @tap="_toggleAudio">
                                <image
                                    class="btn-image"
                                    :src="
                                        pusher.enableMic
                                            ? '/static/wx/video/audio-true.png'
                                            : '/static/wx/video/audio-false.png'
                                    "
                                ></image>
                            </view>
                        </view>
                        <view class="setting-option">
                            <view class="label">切换摄像头</view>
                            <view class="btn-normal" @tap="switchCamera"
                                ><image
                                    class="btn-image"
                                    src="/static/wx/video/switch.png"
                                ></image
                            ></view>
                        </view>
                        <view class="setting-option">
                            <view class="label">开启美颜</view>
                            <switch
                                class="setting-switch"
                                color="#006eff"
                                :checked="
                                    pusher.beautyLevel == 9 ? true : false
                                "
                                data-key="beautyLevel"
                                data-value="9|0"
                                data-value-type="number"
                                @change="_setPuserProperty"
                            />
                        </view>
                        <view class="setting-option">
                            <view class="label">开启AGC</view>
                            <switch
                                class="setting-switch"
                                color="#006eff"
                                :checked="pusher.enableAgc"
                                data-key="enableAgc"
                                data-value="true"
                                data-value-type="boolean"
                                @change="_setPuserProperty"
                            />
                        </view>
                        <view class="setting-option">
                            <view class="label">开启ANS</view>
                            <switch
                                class="setting-switch"
                                color="#006eff"
                                :checked="pusher.enableAns"
                                data-key="enableAns"
                                data-value="true"
                                data-value-type="boolean"
                                @change="_setPuserProperty"
                            />
                        </view>
                        <view class="setting-option">
                            <view class="label">开启横屏推流</view>
                            <switch
                                class="setting-switch"
                                color="#006eff"
                                :checked="
                                    pusher.videoOrientation === 'vertical'
                                        ? false
                                        : true
                                "
                                data-key="videoOrientation"
                                data-value="horizontal|vertical"
                                data-value-type="string"
                                @change="_setPuserProperty"
                            />
                        </view>
                    </scroll-view>
                </view>
            </view>
            <view
                :class="[
                    'panel',
                    'bgm-panel',
                    panelName === 'bgm-panel' ? '' : 'none'
                ]"
            >
                <view @tap="_handleMaskerClick" class="close-btn">X</view>
                <view class="panel-header">背景音乐</view>
                <view class="panel-body">
                    <view class="setting-option">
                        <view class="label">MIC音量</view>
                        <view class="slider-content">
                            <slider
                                :value="MICVolume"
                                min="0"
                                max="100"
                                show-value="true"
                                activeColor="#006eff"
                                @change="_changeProperty"
                                data-property-name="MICVolume"
                            />
                        </view>
                    </view>
                    <view class="setting-option">
                        <view class="label">BGM音量</view>
                        <view class="slider-content">
                            <slider
                                :value="BGMVolume"
                                min="0"
                                max="100"
                                show-value="true"
                                activeColor="#006eff"
                                @change="_changeProperty"
                                data-property-name="BGMVolume"
                            />
                        </view>
                    </view>
                    <view class="setting-option">
                        <view class="label">播放进度</view>
                        <view class="slider-content"
                            ><progress
                                activeColor="#006eff"
                                :percent="BGMProgress"
                            ></progress
                        ></view>
                    </view>
                    <view class="menu">
                        <view
                            class="menu-item"
                            @tap="_handleBGMOperation"
                            data-operation-name="playBGM"
                            ><view class="label">播放</view></view
                        >
                        <view
                            class="menu-item"
                            @tap="_handleBGMOperation"
                            data-operation-name="pauseBGM"
                            ><view class="label">暂停</view></view
                        >
                        <view
                            class="menu-item"
                            @tap="_handleBGMOperation"
                            data-operation-name="resumeBGM"
                            ><view class="label">继续</view></view
                        >
                        <view
                            class="menu-item"
                            @tap="_handleBGMOperation"
                            data-operation-name="stopBGM"
                            ><view class="label">停止</view></view
                        >
                    </view>
                </view>
            </view>
            <view
                :class="{ masker: true, none: panelName == '' }"
                @tap="_handleMaskerClick"
            ></view>
        </view>

        <view class="im-panel" v-if="enableIM && showIMPanel">
            <view class="message-panel-body">
                <scroll-view
                    scroll-y="true"
                    class="message-scroll-container"
                    :scroll-into-view="'message' + (messageList.length - 1)"
                    :scroll-with-animation="true"
                >
                    <view class="message-list">
                        <view
                            class="message-item"
                            v-for="(item, index) in messageList"
                            :key="index"
                            :id="'message' + index"
                        >
                            <span
                                :class="[
                                    'user-name',
                                    item.name == config.userID ? 'mine' : ''
                                ]"
                                >{{ item.name }}</span
                            >
                            <span class="message-content">{{
                                item.message
                            }}</span>
                        </view>
                        <view id="message-bottom"></view>
                    </view>
                </scroll-view>
            </view>
            <view class="message-panel-bottom">
                <view class="message-input-container">
                    <input
                        class="message-input"
                        type="text"
                        :value="messageContent"
                        @input="_inputIMMessage"
                        @confirm="_sendIMMessage"
                        confirm-type="send"
                        placeholder="请输入消息"
                        maxlength="200"
                        placeholder-style="color:#ffffff;opacity: 0.55;"
                    />
                </view>
                <view class="message-send-btn"
                    ><button
                        class="btn"
                        @tap="_sendIMMessage"
                        hover-class="btn-hover"
                    >
                        发送
                    </button></view
                >
            </view>
            <view @tap="_toggleIMPanel" class="close-btn">X</view>
        </view>

        <view
            :class="['debug-info-btn', debugMode && !debugPanel ? '' : 'none']"
        >
            <button
                class="debug-btn"
                @tap="_debugTogglePanel"
                hover-class="button-hover"
            >
                Debug
            </button>
        </view>
        <view :class="['debug-info', debugMode && debugPanel ? '' : 'none']">
            <view @tap="_debugTogglePanel" class="close-btn">X</view>
            <view>appVersion: {{ appVersion }}</view>
            <view>libVersion: {{ libVersion }}</view>
            <view>template: {{ template }}</view>
            <view>
                debug:
                <button
                    :class="{ 'debug-btn': true, false: !debug }"
                    @tap="_debugToggleVideoDebug"
                    hover-class="button-hover"
                >
                    {{ debug }}
                </button>
            </view>
            <view>userID: {{ pusher.userID }}</view>
            <view>roomID: {{ pusher.roomID }}</view>
            <view>
                camera:
                <button
                    :class="{ 'debug-btn': true, false: !pusher.enableCamera }"
                    @tap="_toggleVideo"
                    hover-class="button-hover"
                >
                    {{ pusher.enableCamera }}
                </button>
            </view>
            <view>
                mic:
                <button
                    :class="{ 'debug-btn': true, false: !pusher.enableMic }"
                    @tap="_toggleAudio"
                    hover-class="button-hover"
                >
                    {{ pusher.enableMic }}
                </button>
            </view>
            <view>
                switch camera:
                <button
                    class="debug-btn"
                    @tap="switchCamera"
                    hover-class="button-hover"
                >
                    {{ cameraPosition || pusher.frontCamera }}
                </button>
            </view>
            <view>
                Room:
                <button
                    class="debug-btn"
                    @tap="_debugEnterRoom"
                    hover-class="button-hover"
                >
                    Enter
                </button>
                <button
                    class="debug-btn"
                    @tap="_debugExitRoom"
                    hover-class="button-hover"
                >
                    Exit
                </button>
                <button
                    class="debug-btn"
                    @tap="_debugGoBack"
                    hover-class="button-hover"
                >
                    Go back
                </button>
            </view>
            <view>
                IM:
                <button
                    class="debug-btn"
                    @tap="_debugSendRandomMessage"
                    hover-class="button-hover"
                >
                    send
                </button>
            </view>
            <view>user count: {{ userList.length }}</view>
            <view v-for="(item, index) in userList" :key="item.userID">
                {{ item.userID }}| mainV:
                <span :class="[item.hasMainVideo ? 'true' : 'false', 'text']">{{
                    item.hasMainVideo || false
                }}</span>
                | mainA:
                <span :class="[item.hasMainAudio ? 'true' : 'false', 'text']">{{
                    item.hasMainAudio || false
                }}</span>
                | auxV:
                <span :class="[item.hasAuxVideo ? 'true' : 'false', 'text']">{{
                    item.hasAuxVideo || false
                }}</span>
            </view>
            <view>stream count: {{ streamList.length }}</view>
            <view v-for="(item, index) in streamList" :key="item.streamID">
                {{ item.userName }}|{{ item.streamType }}| SubV:
                <button
                    :class="{ 'debug-btn': true, false: item.muteVideo }"
                    @tap="_debugToggleRemoteVideo"
                    hover-class="button-hover"
                    :data-user-i-d="item.userID"
                    :data-stream-type="item.streamType"
                >
                    {{ !item.muteVideo }}
                </button>
                | SubA:
                <button
                    :class="{ 'debug-btn': true, false: item.muteAudio }"
                    @tap="_debugToggleRemoteAudio"
                    hover-class="button-hover"
                    :data-user-i-d="item.userID"
                    :data-stream-type="item.streamType"
                >
                    {{ !item.muteAudio }}
                </button>
            </view>
        </view>
    </view>
</template>

<script>
import UserController from '@/utils/video/controller/user-controller.js';
import Pusher from '@/utils/video/model/pusher.js';
import {
    EVENT,
    DEFAULT_COMPONENT_CONFIG
} from '@/utils/video/common/constants.js';
import Event from '@/utils/video/utils/event.js';
import * as ENV from '@/utils/video/utils/environment.js';
import TIM from '@/utils/video/libs/tim-wx.js';
import MTA from '@/utils/video/libs/mta_analysis.js';
import { SystemUtils } from '@/utils/power.js';
import { getUserName } from '@/api/app/meet.js';

const TAG_NAME = 'TRTC-ROOM';
const IM_GROUP_TYPE = TIM.TYPES.GRP_CHATROOM; // TIM.TYPES.GRP_CHATROOM 体验版IM无数量限制，成员20个， TIM.TYPES.GRP_AVCHATROOM IM体验版最多10个，升级后无限制

let touchX = 0;
let touchY = 0;

export default {
    name: 'trtc-room',
    props: {
        // 必要的初始化参数
        config: {
            type: Object,
            value: {
                sdkAppID: '',
                userID: '',
                userSig: '',
                template: '',
                debugMode: false, // 是否开启调试模式
                enableIM: true // 是否开启 IM
            }
        }
    },
    watch: {
        config(newVal, oldVal) {
            this._propertyObserver({
                name: 'config',
                newVal,
                oldVal
            });
        },
        visibleStreamList() {
            getUserName({
                userIds: this.visibleStreamList.map((r) => r.userID)
            }).then((res) => {
                this.visibleStreamList.forEach((s) => {
                    console.log(TAG_NAME, 'member userid', s.userID);
                    s.userName = res.data[s.userID];
                });
            });

            this.visibleStreamListLength = this.visibleStreamList.length;
        },
        streamList() {
            getUserName({
                userIds: this.streamList.map((r) => r.userID)
            }).then((res) => {
                this.streamList.forEach((s) => {
                    console.log(TAG_NAME, 'member userid', s.userID);
                    s.userName = res.data[s.userID];
                });
            });
        }
    },
    data() {
        return {
            visibleStreamListLength: 0,
            pusher: null,
            debugPanel: true, // 是否打开组件调试面板
            debug: false, // 是否打开player pusher 的调试信息
            streamList: [], // 用于渲染player列表,存储stram
            visibleStreamList: [], // 有音频或者视频的StreamList
            userList: [], // 扁平化的数据用来返回给用户
            template: '', // 不能设置默认值，当默认值和传入组件的值不一致时，iOS渲染失败
            cameraPosition: '', // 摄像头位置，用于debug
            panelName: '', // 控制面板名称，包括 setting-panel  memberlist-panel
            localVolume: 0,
            remoteVolumeList: [],
            enableIM: true, // 用于组件内渲染
            showIMPanel: false,
            exitIMThrottle: false,
            messageContent: '',
            messageList: [], // 仅保留10条消息
            maxMessageListLength: 10,
            messageListScrollTop: 0,
            appVersion: ENV.APP_VERSION,
            libVersion: ENV.LIB_VERSION,
            hasGridPageTipsShow: false,
            gridPageCount: 0, // grid 布局 player 分页的总页数
            gridCurrentPage: 1, // grid 布局 当前页码
            gridPlayerPerPage: 4, // grid 布局每页 player的数量, 如果大于3，在逻辑里第一页需要减1。等于3 pusher 在每一页都出现。可选值: 3,4
            gridPagePlaceholderStreamList: [], // 占位数量
            isFullscreenDevice: ENV.IS_FULLSCREEN_DEVICE,
            isShowMoreMenu: false,
            MICVolume: 50,
            BGMVolume: 50,
            BGMProgress: 0,

            beautyStyle: 'smooth',
            beautyStyleArray: [
                { value: 'smooth', label: '光滑', checked: true },
                { value: 'nature', label: '自然', checked: false },
                { value: 'close', label: '关闭', checked: false }
            ],
            filterIndex: 0,
            filterArray: [
                { value: 'standard', label: '标准' },
                { value: 'pink', label: '粉嫩' },
                { value: 'nostalgia', label: '怀旧' },
                { value: 'blues', label: '蓝调' },
                { value: 'romantic', label: '浪漫' },
                { value: 'cool', label: '清凉' },
                { value: 'fresher', label: '清新' },
                { value: 'solor', label: '日系' },
                { value: 'aestheticism', label: '唯美' },
                { value: 'whitening', label: '美白' },
                { value: 'cerisered', label: '樱红' }
            ],
            audioReverbType: 0,
            audioReverbTypeArray: [
                '关闭',
                'KTV',
                '小房间',
                '大会堂',
                '低沉',
                '洪亮',
                '金属声',
                '磁性'
            ]
        };
    },
    created() {
        // 在组件实例刚刚被创建时执行
        console.log(TAG_NAME, 'created', ENV);
        MTA.App.init({
            appID: '500710685',
            eventID: '500710697',
            autoReport: true,
            statParam: true
        });
    },
    mounted() {
        // this.initWx();
    },
    deactivated() {
        // 在组件实例被从页面节点树移除时执行
        console.log(TAG_NAME, 'detached');
        // 停止所有拉流，并重置数据
        this.exitRoom();
    },
    /**
     * 生命周期方法
     */
    lifetimes: {
        created: function () {},
        attached: function () {},
        ready: function () {},
        detached: function () {},
        error: function (error) {
            // 每当组件方法抛出错误时执行
            console.log(TAG_NAME, 'error', error);
        }
    },
    pageLifetimes: {
        show: function () {
            // 组件所在的页面被展示时执行
            console.log(TAG_NAME, 'show status:', this.status);
            if (this.status.isPending) {
                // 经历了 5000 挂起事件
                this.status.isPending = false;
                // 修复iOS 最小化触发5000事件后，音频推流失败的问题
                // if (ENV.IS_IOS && this.pusher.enableMic) {
                //   this.unpublishLocalAudio().then(()=>{
                //     this.publishLocalAudio()
                //   })
                // }
                // 经历了 5001 浮窗关闭事件，小程序底层会自动退房，恢复小程序时组件需要重新进房
                // 重新进房
                this.enterRoom({ roomID: this.config.roomID }).then(() => {
                    // 进房后开始推送视频或音频
                    // setTimeout(()=>{
                    //   this.publishLocalVideo()
                    //   this.publishLocalAudio()
                    // }, 2000)
                });
            } else if (
                ENV.IS_ANDROID &&
                this.status.pageLife === 'hide' &&
                this.status.isOnHideAddStream &&
                this.streamList.length > 0
            ) {
                // 微信没有提供明确的最小化事件，onHide事件，不一定是最小化
                // 获取所有的player 清空 src 重新赋值 验证无效
                // 清空 visibleStreamList 重新赋值， 验证无效
                // 退房重新进房，有效但是成本比较高

                // 将标记了 isOnHideAdd 的 stream 的 palyer 销毁并重新渲染
                const streamList = this.streamList;
                let tempStreamList = [];
                // 过滤 onHide 时新增的 stream
                for (let i = 0; i < streamList.length; i++) {
                    if (
                        streamList[i].isOnHideAdd &&
                        streamList[i].playerContext
                    ) {
                        const stream = streamList[i];
                        tempStreamList.push(stream);
                        stream.playerContext = undefined;
                        streamList.splice(i, 1);
                    }
                }
                // 设置渲染，销毁onHide 时新增的 player
                this._setList({
                    streamList: streamList
                }).then(() => {
                    for (let i = 0; i < tempStreamList.length; i++) {
                        streamList.push(tempStreamList[i]);
                    }
                    // 设置渲染，重新创建 onHide 时新增的 player
                    // setTimeout(()=>{
                    this._setList({
                        streamList: streamList
                    }).then(() => {
                        for (let i = 0; i < tempStreamList.length; i++) {
                            tempStreamList[i] = wx.createLivePlayerContext(
                                tempStreamList[i].streamID,
                                this
                            );
                        }
                        tempStreamList = [];
                    });
                    // }, 500)
                });
                this.status.isOnHideAddStream = false;
            }
            this.status.pageLife = 'show';
        },
        hide: function () {
            // 组件所在的页面被隐藏时执行
            console.log(TAG_NAME, 'hide');
            this.status.pageLife = 'hide';
        },
        resize: function (size) {
            // 组件所在的页面尺寸变化时执行
            console.log(TAG_NAME, 'resize', size);
        }
    },
    methods: {
        initWx() {
            // 在组件实例进入页面节点树时执行
            console.log(TAG_NAME, 'attached');
            console.log(TAG_NAME, 'config', this.config);
            this._initWX();
            MTA.Page.stat();

            this.$nextTick(function () {
                // 在组件在视图层布局完成后执行
                console.log(TAG_NAME, 'ready');
            });
        },
        /**
         * 初始化各项参数和用户控制模块，在组件实例触发 attached 时调用，此时不建议对View进行变更渲染（调用setData方法）
         */
        _initWX() {
            console.log(TAG_NAME, '_initWX');
            this.userController = new UserController(this);
            this._emitter = new Event();
            this.EVENT = EVENT;
            this._initStatus();
            this._bindEvent();
            this._gridBindEvent();
            this._keepScreenOn();
            console.log(TAG_NAME, '_initWX success component:', this);
        },
        _initStatus() {
            this.status = {
                isPush: false, // 推流状态
                isPending: false, // 挂起状态，触发5000事件标记为true，onShow后标记为false
                pageLife: '', // 页面生命周期 hide, show
                isOnHideAddStream: false // onHide后有新增Stream
            };
            this._lastTapTime = 0; // 点击时间戳 用于判断双击事件
            this._beforeLastTapTime = 0; // 点击时间戳 用于判断双击事件
            (this._lastTapCoordinate = { x: 0, y: 0 }), // 点击时的坐标
                (this._isFullscreen = false); // 是否进入全屏状态
        },
        /**
         * 监听组件属性变更，外部变更组件属性时触发该监听
         * @param {Object} data newVal，oldVal
         */
        _propertyObserver(data) {
            console.log(TAG_NAME, '_propertyObserver', data, this.config);
            if (data.name === 'config') {
                const config = Object.assign(
                    {},
                    DEFAULT_COMPONENT_CONFIG,
                    data.newVal
                );
                console.log(TAG_NAME, '_propertyObserver config:', config);
                // 由于 querystring 只支持 String 类型，做一个类型防御
                if (typeof config.debugMode === 'string') {
                    config.debugMode =
                        config.debugMode === 'true' ? true : false;
                }
                // 初始化IM
                if (config.enableIM && config.sdkAppID) {
                    this._initIM(config);
                }
                if (
                    config.sdkAppID &&
                    data.oldVal.sdkAppID !== config.sdkAppID &&
                    MTA
                ) {
                    MTA.Event.stat('sdkAppID', { value: config.sdkAppID });
                }
                // 独立设置与pusher无关的配置
                this.enableIM = config.enableIM;
                this.template = config.template;
                this.debugMode = config.debugMode || false;
                this.debug = config.debugMode || false;

                this._setPusherConfig(config);
            }
        },

        //  _______             __        __  __
        //  |       \           |  \      |  \|  \
        //  | $$$$$$$\ __    __ | $$____  | $$ \$$  _______
        //  | $$__/ $$|  \  |  \| $$    \ | $$|  \ /       \
        //  | $$    $$| $$  | $$| $$$$$$$\| $$| $$|  $$$$$$$
        //  | $$$$$$$ | $$  | $$| $$  | $$| $$| $$| $$
        //  | $$      | $$__/ $$| $$__/ $$| $$| $$| $$_____
        //  | $$       \$$    $$| $$    $$| $$| $$ \$$     \
        //   \$$        \$$$$$$  \$$$$$$$  \$$ \$$  \$$$$$$$

        /**
         * 进房
         * @param {Object} params 必传 roomID 取值范围 1 ~ 4294967295
         * @returns {Promise}
         */
        enterRoom(params) {
            return new Promise((resolve, reject) => {
                console.log(TAG_NAME, 'enterRoom');
                console.log(TAG_NAME, 'params', params);
                console.log(TAG_NAME, 'config', this.config);
                console.log(TAG_NAME, 'pusher', this.pusher);
                // 1. 补齐进房参数，校验必要参数是否齐全
                if (params) {
                    Object.assign(this.pusher, params);
                    Object.assign(this.config, params);
                }
                if (!this._checkParam(this.config)) {
                    reject(new Error('缺少必要参数'));
                    return;
                }
                // 2. 根据参数拼接 push url，赋值给 live-pusher，
                this._getPushUrl(this.config)
                    .then((pushUrl) => {
                        this.pusher.url = pushUrl;
                        this.$nextTick(() => {
                            // 真正进房成功需要通过 1018 事件通知
                            console.log(TAG_NAME, 'enterRoom', this.pusher);
                            // view 渲染成功回调后，开始推流
                            this.pusher.getPusherContext().start();
                            this.status.isPush = true;
                            console.log(
                                '----------------------------------pusher----------------------'
                            );
                            console.log(JSON.stringify(this.pusher));
                            resolve();
                        });
                    })
                    .catch((res) => {
                        // 进房失败需要通过 pusher state 事件通知，目前还没有准确的事件通知
                        console.error(TAG_NAME, 'enterRoom error', res);
                        reject(res);
                    });
                // 初始化 IM SDK
                // this._initIM(this.config)
                // 登录IM
                this._loginIM({ ...this.config, roomID: params.roomID });
            });
        },
        /**
         * 退房，停止推流和拉流，并重置数据
         * @returns {Promise}
         */
        exitRoom() {
            if (this.status.pageLife === 'hide') {
                // 如果是退后台触发 onHide，不能调用 pusher API
                console.warn(
                    TAG_NAME,
                    '小程序最小化时不能调用 exitRoom，如果不想听到远端声音，可以调用取消订阅，如果不想远端听到声音，可以调用取消发布'
                );
            }
            return new Promise((resolve, reject) => {
                console.log(TAG_NAME, 'exitRoom');
                this._exitIM();
                this.pusher.reset();
                this.status.isPush = false;
                const result = this.userController.reset();
                this.userList = result.userList;
                this.streamList = result.streamList;
                this.visibleStreamList = this._filterVisibleStream(
                    result.streamList
                );

                this.$nextTick(() => {
                    // 在销毁页面时调用exitRoom时，不会走到这里
                    resolve({
                        userList: this.userList,
                        streamList: this.streamList
                    });
                    console.log(
                        TAG_NAME,
                        'exitRoom success',
                        this.pusher,
                        this.streamList,
                        this.userList
                    );
                    // 20200421 iOS 仍然没有1019事件通知退房，退房事件移动到 exitRoom 方法里，但不是后端通知的退房成功
                    this._emitter.emit(EVENT.LOCAL_LEAVE, {
                        userID: this.pusher.userID
                    });

                    this.pusher.getPusherContext().close();
                });
            });
        },
        /**
         * 开启摄像头
         * @returns {Promise}
         */
        publishLocalVideo() {
            // 设置 pusher enableCamera
            console.log(TAG_NAME, 'publishLocalVideo 开启摄像头');
            return this._setPusherConfig({ enableCamera: true });
        },
        /**
         * 关闭摄像头
         * @returns {Promise}
         */
        unpublishLocalVideo() {
            // 设置 pusher enableCamera
            console.log(TAG_NAME, 'unpublshLocalVideo 关闭摄像头');
            return this._setPusherConfig({ enableCamera: false });
        },
        /**
         * 开启麦克风
         * @returns {Promise}
         */
        publishLocalAudio() {
            // 设置 pusher enableCamera
            console.log(TAG_NAME, 'publishLocalAudio 开启麦克风');
            return this._setPusherConfig({ enableMic: true });
        },
        /**
         * 关闭麦克风
         * @returns {Promise}
         */
        unpublishLocalAudio() {
            // 设置 pusher enableCamera
            console.log(TAG_NAME, 'unpublshLocalAudio 关闭麦克风');
            return this._setPusherConfig({ enableMic: false });
        },
        /**
         * 订阅远端视频 主流 小画面 辅流
         * @param {Object} params {userID,streamType} streamType 传入 small 时修改对应的主流 url 的 _definitionType 参数为 small, stream.streamType 仍为 main
         * @returns {Promise}
         */
        subscribeRemoteVideo(params) {
            console.log(TAG_NAME, 'subscribeRemoteVideo', params);
            // 设置指定 user streamType 的 muteVideo 为 false
            const config = {
                muteVideo: false
            };
            // 本地数据结构里的 streamType 只支持 main 和 aux ，订阅 small 也是对 main 进行处理
            const streamType =
                params.streamType === 'small' ? 'main' : params.streamType;
            const stream = this.userController.getStream({
                userID: params.userID,
                streamType: streamType
            });
            stream.muteVideoPrev = false; // 用于分页切换时保留player当前的订阅状态

            if (params.streamType === 'small' || params.streamType === 'main') {
                if (stream && stream.streamType === 'main') {
                    console.log(
                        TAG_NAME,
                        'subscribeRemoteVideo switch small',
                        stream.src
                    );
                    if (params.streamType === 'small') {
                        config.src = stream.src.replace('main', 'small');
                        config._definitionType = 'small'; // 用于设置面板的渲染
                    } else if (params.streamType === 'main') {
                        stream.src = stream.src.replace('small', 'main');
                        config._definitionType = 'main';
                    }
                    console.log(TAG_NAME, 'subscribeRemoteVideo', stream.src);
                }
            }
            return this._setPlayerConfig({
                userID: params.userID,
                streamType: streamType,
                config: config
            });
        },
        /**
         * 取消订阅远端视频
         * @param {Object} params {userID,streamType}
         * @returns {Promise}
         */
        unsubscribeRemoteVideo(params) {
            console.log(TAG_NAME, 'unsubscribeRemoteVideo', params);
            const stream = this.userController.getStream({
                userID: params.userID,
                streamType: params.streamType
            });
            stream.muteVideoPrev = true; // 用于分页切换时保留player当前的订阅状态
            // 设置指定 user streamType 的 muteVideo 为 true
            return this._setPlayerConfig({
                userID: params.userID,
                streamType: params.streamType,
                config: {
                    muteVideo: true
                }
            });
        },
        /**
         * 订阅远端音频
         * @param {Object} params userID 用户ID
         * @returns {Promise}
         */
        subscribeRemoteAudio(params) {
            console.log(TAG_NAME, 'subscribeRemoteAudio', params);
            return this._setPlayerConfig({
                userID: params.userID,
                streamType: 'main',
                config: {
                    muteAudio: false
                }
            });
        },
        /**
         * 取消订阅远端音频
         * @param {Object} params userID 用户ID
         * @returns {Promise}
         */
        unsubscribeRemoteAudio(params) {
            console.log(TAG_NAME, 'unsubscribeRemoteAudio', params);
            return this._setPlayerConfig({
                userID: params.userID,
                streamType: 'main',
                config: {
                    muteAudio: true
                }
            });
        },
        on(eventCode, handler, context) {
            this._emitter.on(eventCode, handler, context);
        },
        off(eventCode, handler) {
            this._emitter.off(eventCode, handler);
        },
        getRemoteUserList() {
            return this.userList;
        },
        /**
         * 切换前后摄像头
         */
        switchCamera() {
            if (!this.cameraPosition) {
                // this.pusher.cameraPosition 是初始值，不支持动态设置
                this.cameraPosition = this.pusher.frontCamera;
            }
            console.log(TAG_NAME, 'switchCamera', this.cameraPosition);
            this.cameraPosition =
                this.cameraPosition === 'front' ? 'back' : 'front';
            this.$nextTick(() => {
                console.log(
                    TAG_NAME,
                    'switchCamera success',
                    this.cameraPosition
                );
            });
            // wx 7.0.9 不支持动态设置 pusher.frontCamera ，只支持调用 API switchCamer() 设置，这里修改 cameraPosition 是为了记录状态
            this.pusher.getPusherContext().switchCamera();
        },
        /**
         * 设置指定player view的渲染坐标和尺寸
         * @param {object} params
         * userID: string
         * streamType: string
         * xAxis: number
         * yAxis: number
         * width: number
         * height: number
         * @returns {Promise}
         */
        setViewRect(params) {
            console.log(TAG_NAME, 'setViewRect', params);
            if (this.template !== 'custom') {
                console.warn(
                    `如需使用setViewRect方法，请初始化时设置template:"custom", 当前 template:"${this.template}"`
                );
            }
            console.info(
                `不建议使用该方法动态修改样式，避免引起微信小程序渲染问题，建议直接修改 wxml wxss 进行样式定制化`
            );
            if (this.pusher.userID === params.userID) {
                return this._setPusherConfig({
                    xAxis: params.xAxis,
                    yAxis: params.yAxis,
                    width: params.width,
                    height: params.height
                });
            }
            return this._setPlayerConfig({
                userID: params.userID,
                streamType: params.streamType,
                config: {
                    xAxis: params.xAxis,
                    yAxis: params.yAxis,
                    width: params.width,
                    height: params.height
                }
            });
        },
        /**
         * 设置指定 player 或者 pusher view 是否可见
         * @param {object} params
         * userID: string
         * streamType: string
         * isVisible：boolean
         * @returns {Promise}
         */
        setViewVisible(params) {
            console.log(TAG_NAME, 'setViewVisible', params);
            if (this.template !== 'custom') {
                console.warn(
                    `如需使用setViewVisible方法，请初始化时设置template:"custom", 当前 template:"${this.template}"`
                );
            }
            console.info(
                `不建议使用该方法动态修改样式，避免引起微信小程序渲染问题，建议直接修改 wxml wxss 进行样式定制化`
            );
            if (this.pusher.userID === params.userID) {
                return this._setPusherConfig({
                    isVisible: params.isVisible
                });
            }
            return this._setPlayerConfig({
                userID: params.userID,
                streamType: params.streamType,
                config: {
                    isVisible: params.isVisible
                }
            });
        },
        /**
         * 设置指定player view的层级
         * @param {Object} params
         * userID: string
         * streamType: string
         * zIndex: number
         * @returns {Promise}
         */
        setViewZIndex(params) {
            console.log(TAG_NAME, 'setViewZIndex', params);
            if (this.template !== 'custom') {
                console.warn(
                    `如需使用setViewZIndex方法，请初始化时设置template:"custom", 当前 template:"${this.template}"`
                );
            }
            console.info(
                `不建议使用该方法动态修改样式，避免引起微信小程序渲染问题，建议直接修改 wxml wxss 进行样式定制化`
            );
            if (this.pusher.userID === params.userID) {
                return this._setPusherConfig({
                    zIndex: params.zindex || params.zIndex
                });
            }
            return this._setPlayerConfig({
                userID: params.userID,
                streamType: params.streamType,
                config: {
                    zIndex: params.zindex || params.zIndex
                }
            });
        },
        /**
         * 播放背景音
         * @param {Object} params url
         * @returns {Promise}
         */
        playBGM(params) {
            return new Promise((resolve, reject) => {
                this.pusher.getPusherContext().playBGM({
                    url: params.url,
                    // 已经有相关事件不需要在这里监听,目前用于测试
                    success: () => {
                        console.log(TAG_NAME, '播放背景音成功');
                        // this._emitter.emit(EVENT.BGM_PLAY_START)
                        resolve();
                    },
                    fail: () => {
                        console.log(TAG_NAME, '播放背景音失败');
                        this._emitter.emit(EVENT.BGM_PLAY_FAIL);
                        reject(new Error('播放背景音失败'));
                    }
                    // complete: () => {
                    //   console.log(TAG_NAME, '背景完成')
                    //   this._emitter.emit(EVENT.BGM_PLAY_COMPLETE)
                    // },
                });
            });
        },
        stopBGM() {
            this.pusher.getPusherContext().stopBGM();
        },
        pauseBGM() {
            this.pusher.getPusherContext().pauseBGM();
        },
        resumeBGM() {
            this.pusher.getPusherContext().resumeBGM();
        },
        /**
         * 设置背景音音量
         * @param {Object} params volume
         */
        setBGMVolume(params) {
            console.log(TAG_NAME, 'setBGMVolume', params);
            this.pusher
                .getPusherContext()
                .setBGMVolume({ volume: params.volume });
        },
        /**
         * 设置麦克风音量
         * @param {Object} params volume
         */
        setMICVolume(params) {
            console.log(TAG_NAME, 'setMICVolume', params);
            this.pusher
                .getPusherContext()
                .setMICVolume({ volume: params.volume });
        },
        /**
         * 发送SEI消息
         * @param {Object} params message
         * @returns {Promise}
         */
        sendSEI(params) {
            return new Promise((resolve, reject) => {
                this.pusher.getPusherContext().sendMessage({
                    msg: params.message,
                    success: function (result) {
                        resolve(result);
                    }
                });
            });
        },
        /**
         * pusher 和 player 的截图并保存
         * @param {Object} params userID streamType
         * @returns {Promise}
         */
        snapshot(params) {
            console.log(TAG_NAME, 'snapshot', params);
            return new Promise((resolve, reject) => {
                this.captureSnapshot(params)
                    .then((result) => {
                        wx.saveImageToPhotosAlbum({
                            filePath: result.tempImagePath,
                            success(res) {
                                wx.showToast({
                                    title: '已保存到相册'
                                });
                                console.log('save photo is success', res);
                                resolve(result);
                            },
                            fail: function (error) {
                                wx.showToast({
                                    icon: 'none',
                                    title: '保存失败'
                                });
                                console.log('save photo is fail', error);
                                reject(error);
                            }
                        });
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        /**
         * 获取pusher 和 player 的截图
         * @param {Object} params userID streamType
         * @returns {Promise}
         */
        captureSnapshot(params) {
            return new Promise((resolve, reject) => {
                if (params.userID === this.pusher.userID) {
                    // pusher
                    this.pusher.getPusherContext().snapshot({
                        quality: 'raw',
                        complete: (result) => {
                            console.log(TAG_NAME, 'snapshot pusher', result);
                            if (result.tempImagePath) {
                                resolve(result);
                            } else {
                                console.log('snapShot 回调失败', result);
                                reject(new Error('截图失败'));
                            }
                        }
                    });
                } else {
                    // player
                    this.userController
                        .getStream(params)
                        .playerContext.snapshot({
                            quality: 'raw',
                            complete: (result) => {
                                console.log(
                                    TAG_NAME,
                                    'snapshot player',
                                    result
                                );
                                if (result.tempImagePath) {
                                    resolve(result);
                                } else {
                                    console.log('snapShot 回调失败', result);
                                    reject(new Error('截图失败'));
                                }
                            }
                        });
                }
            });
        },
        /**
         * 将远端视频全屏
         * @param {Object} params userID streamType direction
         * @returns {Promise}
         */
        enterFullscreen(params) {
            console.log(TAG_NAME, 'enterFullscreen', params);
            return new Promise((resolve, reject) => {
                this.userController
                    .getStream(params)
                    .playerContext.requestFullScreen({
                        direction: params.direction || 0,
                        success: (event) => {
                            console.log(
                                TAG_NAME,
                                'enterFullscreen success',
                                event
                            );
                            resolve(event);
                        },
                        fail: (event) => {
                            console.log(
                                TAG_NAME,
                                'enterFullscreen fail',
                                event
                            );
                            reject(event);
                        }
                    });
            });
        },
        /**
         * 将远端视频取消全屏
         * @param {Object} params userID streamType
         * @returns {Promise}
         */
        exitFullscreen(params) {
            console.log(TAG_NAME, 'exitFullscreen', params);
            return new Promise((resolve, reject) => {
                this.userController
                    .getStream(params)
                    .playerContext.exitFullScreen({
                        success: (event) => {
                            console.log(
                                TAG_NAME,
                                'exitFullScreen success',
                                event
                            );
                            resolve(event);
                        },
                        fail: (event) => {
                            console.log(TAG_NAME, 'exitFullScreen fail', event);
                            reject(event);
                        }
                    });
            });
        },
        /**
         * 设置 player 视图的横竖屏显示
         * @param {Object} params userID streamType orientation: vertical, horizontal
         * @returns {Promise}
         */
        setRemoteOrientation(params) {
            return this._setPlayerConfig({
                userID: params.userID,
                streamType: params.streamType,
                config: {
                    orientation: params.orientation
                }
            });
        },
        // 改为：
        setViewOrientation(params) {
            return this._setPlayerConfig({
                userID: params.userID,
                streamType: params.streamType,
                config: {
                    orientation: params.orientation
                }
            });
        },
        /**
         * 设置 player 视图的填充模式
         * @param {Object} params userID streamType fillMode: contain，fillCrop
         * @returns {Promise}
         */
        setRemoteFillMode(params) {
            return this._setPlayerConfig({
                userID: params.userID,
                streamType: params.streamType,
                config: {
                    objectFit: params.fillMode
                }
            });
        },
        // 改为：
        setViewFillMode(params) {
            return this._setPlayerConfig({
                userID: params.userID,
                streamType: params.streamType,
                config: {
                    objectFit: params.fillMode
                }
            });
        },
        /**
         * 发送C2C文本消息
         * @param {*} params userID,message
         * @returns {Promise}
         */
        sendC2CTextMessage(params) {
            if (!this.tim) {
                console.warn(TAG_NAME, '未开启IM功能，该方法无法使用', params);
                return;
            }
            console.log(TAG_NAME, 'sendC2CTextMessage', params);
            const message = this.tim.createTextMessage({
                to: params.userID + '',
                conversationType: TIM.TYPES.CONV_C2C,
                payload: {
                    text: params.message
                }
            });
            const promise = this.tim.sendMessage(message);
            promise
                .then(function (imResponse) {
                    // 发送成功
                    console.log(
                        TAG_NAME,
                        'sendC2CTextMessage success',
                        imResponse
                    );
                })
                .catch(function (imError) {
                    // 发送失败
                    console.warn(
                        TAG_NAME,
                        'sendC2CTextMessage error:',
                        imError
                    );
                });
            return promise;
        },
        /**
         * 发送C2C自定义消息
         * @param {*} params: userID payload
         * @returns {Promise}
         *
         */
        sendC2CCustomMessage(params) {
            if (!this.tim) {
                console.warn(TAG_NAME, '未开启IM功能，该方法无法使用', params);
                return;
            }
            console.log(TAG_NAME, 'sendC2CCustomMessage', params);
            const message = this.tim.createCustomMessage({
                to: params.userID + '',
                conversationType: TIM.TYPES.CONV_C2C,
                payload: params.payload
            });
            const promise = this.tim.sendMessage(message);
            promise
                .then(function (imResponse) {
                    // 发送成功
                    console.log(TAG_NAME, 'sendMessage success', imResponse);
                })
                .catch(function (imError) {
                    // 发送失败
                    console.warn(TAG_NAME, 'sendMessage error:', imError);
                });
            return promise;
        },
        /**
         * 发送群组文本消息
         * @param {*} params roomID message
         * @returns {Promise}
         *
         */
        sendGroupTextMessage(params) {
            if (!this.tim) {
                console.warn(TAG_NAME, '未开启IM功能，该方法无法使用', params);
                return;
            }
            console.log(TAG_NAME, 'sendGroupTextMessage', params);
            const message = this.tim.createTextMessage({
                to: params.roomID + '',
                conversationType: TIM.TYPES.CONV_GROUP,
                payload: {
                    text: params.message
                }
            });
            const promise = this.tim.sendMessage(message);
            promise
                .then(function (imResponse) {
                    // 发送成功
                    console.log(
                        TAG_NAME,
                        'sendGroupTextMessage success',
                        imResponse
                    );
                })
                .catch(function (imError) {
                    // 发送失败
                    console.warn(
                        TAG_NAME,
                        'sendGroupTextMessage error:',
                        imError
                    );
                });
            return promise;
        },
        /**
         * 发送群组自定义消息
         * @param {*} params roomID payload
         * @returns {Promise}
         *
         */
        sendGroupCustomMessage(params) {
            if (!this.tim) {
                console.warn(TAG_NAME, '未开启IM功能，该方法无法使用', params);
                return;
            }
            console.log(TAG_NAME, 'sendGroupCustomMessage', params);
            const message = this.tim.createCustomMessage({
                to: params.roomID + '',
                conversationType: TIM.TYPES.CONV_GROUP,
                payload: params.payload
            });
            const promise = this.tim.sendMessage(message);
            promise
                .then(function (imResponse) {
                    // 发送成功
                    console.log(TAG_NAME, 'sendMessage success', imResponse);
                })
                .catch(function (imError) {
                    // 发送失败
                    console.warn(TAG_NAME, 'sendMessage error:', imError);
                });
            return promise;
        },

        // ______             __                                              __
        // |      \           |  \                                            |  \
        //  \$$$$$$ _______  _| $$_     ______    ______   _______    ______  | $$
        //   | $$  |       \|   $$ \   /      \  /      \ |       \  |      \ | $$
        //   | $$  | $$$$$$$\\$$$$$$  |  $$$$$$\|  $$$$$$\| $$$$$$$\  \$$$$$$\| $$
        //   | $$  | $$  | $$ | $$ __ | $$    $$| $$   \$$| $$  | $$ /      $$| $$
        //  _| $$_ | $$  | $$ | $$|  \| $$$$$$$$| $$      | $$  | $$|  $$$$$$$| $$
        // |   $$ \| $$  | $$  \$$  $$ \$$     \| $$      | $$  | $$ \$$    $$| $$
        //  \$$$$$$ \$$   \$$   \$$$$   \$$$$$$$ \$$       \$$   \$$  \$$$$$$$ \$$
        /**
         * 设置推流参数并触发页面渲染更新
         * @param {Object} config live-pusher 的配置
         * @returns {Promise}
         */
        _setPusherConfig(config, skipLog = false) {
            if (!skipLog) {
                console.log(TAG_NAME, '_setPusherConfig', config, this.pusher);
            }
            return new Promise((resolve, reject) => {
                if (!this.pusher) {
                    this.pusher = new Pusher(config);
                } else {
                    Object.assign(this.pusher, config);
                }
                this.$nextTick(() => {
                    if (!skipLog) {
                        console.log(
                            TAG_NAME,
                            '_setPusherConfig setData compelete',
                            'config:',
                            config,
                            'pusher:',
                            this.pusher
                        );
                    }
                    resolve(config);
                });
            });
        },
        /**
         * 设置指定 player 属性并触发页面渲染
         * @param {Object} params include userID,streamType,config
         * @returns {Promise}
         */
        _setPlayerConfig(params) {
            const userID = params.userID;
            const streamType = params.streamType;
            const config = params.config;
            console.log(TAG_NAME, '_setPlayerConfig', params);
            return new Promise((resolve, reject) => {
                // 获取指定的userID streamType 的 stream
                const user = this.userController.getUser(userID);
                if (user && user.streams[streamType]) {
                    Object.assign(user.streams[streamType], config);
                    // user.streams引用的对象和 streamList 里的是同一个
                    this.visibleStreamList = this._filterVisibleStream(
                        this.streamList,
                        true
                    );
                    this.$nextTick(() => {
                        // console.log(TAG_NAME, '_setPlayerConfig complete', params, 'streamList:', this.streamList)
                        resolve(params);
                    });
                } else {
                    // 不需要reject，静默处理
                    console.warn(
                        TAG_NAME,
                        '指定 userID 或者 streamType 不存在'
                    );
                    // reject(new Error('指定 userID 或者 streamType 不存在'))
                }
            });
        },
        /**
         * 设置列表数据，并触发页面渲染
         * @param {Object} params include userList, stramList
         * @returns {Promise}
         */
        _setList(params) {
            console.log(TAG_NAME, '_setList', params, this.template);
            const { userList, streamList } = params;
            return new Promise((resolve, reject) => {
                let visibleStreamList = [];
                this.userList = userList || this.userList;
                this.streamList = streamList || this.streamList;

                if (this.template === 'grid') {
                    visibleStreamList = this._filterVisibleStream(streamList);
                    this.visibleStreamList =
                        visibleStreamList || this.visibleStreamList;
                }

                this.$nextTick(() => {
                    resolve(params);
                });
            });
        },
        /**
         * 必选参数检测
         * @param {Object} rtcConfig rtc参数
         * @returns {Boolean}
         */
        _checkParam(rtcConfig) {
            console.log(TAG_NAME, 'checkParam config:', rtcConfig);
            if (!rtcConfig.sdkAppID) {
                console.error('未设置 sdkAppID');
                return false;
            }
            if (rtcConfig.roomID === undefined) {
                console.error('未设置 roomID');
                return false;
            }
            if (rtcConfig.roomID < 1 || rtcConfig.roomID > 4294967296) {
                console.error('roomID 超出取值范围 1 ~ 4294967295');
                return false;
            }
            if (!rtcConfig.userID) {
                console.error('未设置 userID');
                return false;
            }
            if (!rtcConfig.userSig) {
                console.error('未设置 userSig');
                return false;
            }
            if (!rtcConfig.template) {
                console.error('未设置 template');
                return false;
            }
            return true;
        },
        _getPushUrl(rtcConfig) {
            // 拼接 puhser url rtmp 方案
            console.log(TAG_NAME, '_getPushUrl', rtcConfig);
            if (ENV.IS_TRTC) {
                // 版本高于7.0.8，基础库版本高于2.10.0 使用新的 url
                return new Promise((resolve, reject) => {
                    // appscene videocall live
                    // cloudenv PRO CCC DEV UAT
                    // encsmall 0
                    // 对外的默认值是rtc ，对内的默认值是videocall
                    rtcConfig.scene =
                        !rtcConfig.scene || rtcConfig.scene === 'rtc'
                            ? 'videocall'
                            : rtcConfig.scene;
                    rtcConfig.enableBlackStream =
                        rtcConfig.enableBlackStream || ''; // 是否支持在纯音频下推送SEI消息，注意：在关闭enable-recv-message后还是无法接收
                    rtcConfig.encsmall = rtcConfig.encsmall || 0; // 是否编小画面，这个特性不建议学生默认开启，只有老师端才比较有意义
                    rtcConfig.cloudenv = rtcConfig.cloudenv || 'PRO';
                    rtcConfig.streamID = rtcConfig.streamID || ''; // 指定旁边路直播的流ID
                    rtcConfig.userDefineRecordID =
                        rtcConfig.userDefineRecordID || ''; // 指定录制文件的recordid
                    rtcConfig.privateMapKey = rtcConfig.privateMapKey || ''; // 字符串房间号
                    rtcConfig.pureAudioMode = rtcConfig.pureAudioMode || ''; // 指定是否纯音频推流及录制，默认不填，值为1 或 2，其他值非法不处理
                    rtcConfig.recvMode = rtcConfig.recvMode || 1; // 1. 自动接收音视频 2. 仅自动接收音频 3. 仅自动接收视频 4. 音视频都不自动接收, 不能绑定player
                    let roomID = '';
                    if (/^\d+$/.test(rtcConfig.roomID)) {
                        // 数字房间号
                        roomID = '&roomid=' + rtcConfig.roomID;
                    } else {
                        // 字符串房间号
                        roomID = '&strroomid=' + rtcConfig.roomID;
                    }
                    setTimeout(() => {
                        const pushUrl =
                            'room://cloud.tencent.com/rtc?sdkappid=' +
                            rtcConfig.sdkAppID +
                            roomID +
                            '&userid=' +
                            (SystemUtils.getSystemInfo().platform === 'android'
                                ? rtcConfig.userID
                                : encodeURI(rtcConfig.userID)) +
                            '&usersig=' +
                            rtcConfig.userSig +
                            '&appscene=' +
                            rtcConfig.scene +
                            '&encsmall=' +
                            rtcConfig.encsmall +
                            '&cloudenv=' +
                            rtcConfig.cloudenv +
                            '&enableBlackStream=' +
                            rtcConfig.enableBlackStream +
                            '&streamid=' +
                            rtcConfig.streamID +
                            '&userdefinerecordid=' +
                            rtcConfig.userDefineRecordID +
                            '&privatemapkey=' +
                            rtcConfig.privateMapKey +
                            '&pureaudiomode=' +
                            rtcConfig.pureAudioMode +
                            '&recvmode=' +
                            rtcConfig.recvMode;
                        console.warn(TAG_NAME, 'getPushUrl result:', pushUrl);
                        resolve(pushUrl);
                    }, 0);
                });
            }
            console.error(
                TAG_NAME,
                '组件仅支持微信 App iOS >=7.0.9, Android >= 7.0.8, 小程序基础库版 >= 2.10.0'
            );
            console.error(TAG_NAME, '需要真机运行，开发工具不支持实时音视频');
        },
        /**
         * 获取签名和推流地址
         * @param {Object} rtcConfig 进房参数配置
         * @returns {Promise}
         */
        _requestSigServer(rtcConfig) {
            console.log(TAG_NAME, '_requestSigServer:', rtcConfig);
            const sdkAppID = rtcConfig.sdkAppID;
            const userID = rtcConfig.userID;
            const userSig = rtcConfig.userSig;
            const roomID = rtcConfig.roomID;
            const privateMapKey = rtcConfig.privateMapKey;

            rtcConfig.useCloud =
                rtcConfig.useCloud === undefined ? true : rtcConfig.useCloud;
            let url = rtcConfig.useCloud
                ? 'https://official.opensso.tencent-cloud.com/v4/openim/jsonvideoapp'
                : 'https://yun.tim.qq.com/v4/openim/jsonvideoapp';
            url +=
                '?sdkappid=' +
                sdkAppID +
                '&identifier=' +
                userID +
                '&usersig=' +
                userSig +
                '&random=' +
                Date.now() +
                '&contenttype=json';

            const reqHead = {
                Cmd: 1,
                SeqNo: 1,
                BusType: 7,
                GroupId: roomID
            };
            const reqBody = {
                PrivMapEncrypt: privateMapKey,
                TerminalType: 1,
                FromType: 3,
                SdkVersion: 26280566
            };
            console.log(TAG_NAME, '_requestSigServer:', url, reqHead, reqBody);
            return new Promise((resolve, reject) => {
                wx.request({
                    url: url,
                    data: {
                        ReqHead: reqHead,
                        ReqBody: reqBody
                    },
                    method: 'POST',
                    success: (res) => {
                        console.log('_requestSigServer success:', res);
                        if (
                            res.data['ErrorCode'] ||
                            res.data['RspHead']['ErrorCode'] !== 0
                        ) {
                            // console.error(res.data['ErrorInfo'] || res.data['RspHead']['ErrorInfo'])
                            console.error('获取roomsig失败');
                            reject(res);
                        }

                        const roomSig = JSON.stringify(res.data['RspBody']);
                        let pushUrl =
                            'room://cloud.tencent.com?sdkappid=' +
                            sdkAppID +
                            '&roomid=' +
                            roomID +
                            '&userid=' +
                            (SystemUtils.getSystemInfo().platform === 'android'
                                ? userID
                                : encodeURI(userID)) +
                            '&roomsig=' +
                            encodeURIComponent(roomSig);
                        // TODO 需要重新整理的逻辑 TRTC尚未支持 20200213
                        // 如果有配置纯音频推流或者recordId参数
                        if (rtcConfig.pureAudioPushMod || rtcConfig.recordId) {
                            const bizbuf = {
                                Str_uc_params: {
                                    pure_audio_push_mod: 0,
                                    record_id: 0
                                }
                            };
                            // 纯音频推流
                            if (rtcConfig.pureAudioPushMod) {
                                bizbuf.Str_uc_params.pure_audio_push_mod =
                                    rtcConfig.pureAudioPushMod;
                            } else {
                                delete bizbuf.Str_uc_params.pure_audio_push_mod;
                            }
                            // 自动录制时业务自定义id
                            if (rtcConfig.recordId) {
                                bizbuf.Str_uc_params.record_id =
                                    rtcConfig.recordId;
                            } else {
                                delete bizbuf.Str_uc_params.record_id;
                            }
                            pushUrl +=
                                '&bizbuf=' +
                                encodeURIComponent(JSON.stringify(bizbuf));
                        }
                        console.log('roomSigInfo', pushUrl);
                        resolve(pushUrl);
                    },
                    fail: (res) => {
                        console.log(TAG_NAME, 'requestSigServer fail:', res);
                        reject(res);
                    }
                });
            });
        },
        _doubleTabToggleFullscreen(event) {
            const curTime = event.timeStamp;
            const lastTime = this._lastTapTime;
            const lastTapCoordinate = this._lastTapCoordinate;
            const currentTapCoordinate = event.detail;
            // 计算两次点击的距离
            const distence = Math.sqrt(
                Math.pow(
                    Math.abs(currentTapCoordinate.x - lastTapCoordinate.x),
                    2
                ) +
                    Math.pow(
                        Math.abs(currentTapCoordinate.y - lastTapCoordinate.y),
                        2
                    )
            );
            this._lastTapCoordinate = currentTapCoordinate;
            // 已知问题：上次全屏操作后，必须等待1.5s后才能再次进行全屏操作，否则引发SDK全屏异常，因此增加节流逻辑
            const beforeLastTime = this._beforeLastTapTime;
            console.log(
                TAG_NAME,
                '_doubleTabToggleFullscreen',
                event,
                lastTime,
                beforeLastTime,
                distence
            );

            if (
                curTime - lastTime > 0 &&
                curTime - lastTime < 300 &&
                lastTime - beforeLastTime > 1500 &&
                distence < 20
            ) {
                const userID = event.currentTarget.dataset.userid;
                const streamType = event.currentTarget.dataset.streamtype;
                if (this._isFullscreen) {
                    this.exitFullscreen({ userID, streamType })
                        .then(() => {
                            this._isFullscreen = false;
                        })
                        .catch(() => {});
                } else {
                    // const stream = this.userController.getStream({ userID, streamType })
                    let direction;
                    // // 已知问题：视频的尺寸需要等待player触发NetStatus事件才能获取到，如果进房就双击全屏，全屏后的方向有可能不对。
                    // if (stream && stream.videoWidth && stream.videoHeight) {
                    //   // 如果是横视频，全屏时进行横屏处理。如果是竖视频，则为0
                    //   direction = stream.videoWidth > stream.videoHeight ? 90 : 0
                    // }
                    this.enterFullscreen({ userID, streamType, direction })
                        .then(() => {
                            this._isFullscreen = true;
                        })
                        .catch(() => {});
                }
                this._beforeLastTapTime = lastTime;
            }
            this._lastTapTime = curTime;
        },
        /**
         * TRTC-room 远端用户和音视频状态处理
         */
        _bindEvent() {
            // 远端用户进房 TODO
            this.userController.on(EVENT.REMOTE_USER_JOIN, (event) => {
                console.log(TAG_NAME, '远端用户进房', event, event.data.userID);
                this.userList = event.data.userList;
                this.$nextTick(() => {
                    this._emitter.emit(EVENT.REMOTE_USER_JOIN, {
                        userID: event.data.userID
                    });
                });
                console.log(
                    TAG_NAME,
                    'REMOTE_USER_JOIN',
                    'streamList:',
                    this.streamList,
                    'userList:',
                    this.userList
                );
            });
            // 远端用户离开
            this.userController.on(EVENT.REMOTE_USER_LEAVE, (event) => {
                console.log(TAG_NAME, '远端用户离开', event, event.data.userID);
                if (event.data.userID) {
                    this._setList({
                        userList: event.data.userList,
                        streamList: event.data.streamList
                    }).then(() => {
                        this._emitter.emit(EVENT.REMOTE_USER_LEAVE, {
                            userID: event.data.userID
                        });
                    });
                }
                console.log(
                    TAG_NAME,
                    'REMOTE_USER_LEAVE',
                    'streamList:',
                    this.streamList,
                    'userList:',
                    this.userList
                );
            });
            // 视频状态 true
            this.userController.on(EVENT.REMOTE_VIDEO_ADD, (event) => {
                console.log(
                    TAG_NAME,
                    '远端视频可用',
                    event,
                    event.data.stream.userID
                );
                console.log(JSON.stringify(event.data.streamList));
                const stream = event.data.stream;
                // 如果Android onHide 时，新增的player 无法播放 记录标识位
                if (this.status.pageLife === 'hide') {
                    this.status.isOnHideAddStream = true;
                    stream.isOnHideAdd = true;
                }
                this._setList({
                    userList: event.data.userList,
                    streamList: event.data.streamList
                }).then(() => {
                    // 完善 的stream 的 playerContext
                    stream.playerContext = wx.createLivePlayerContext(
                        stream.streamID,
                        this
                    );
                    // 新增的需要触发一次play 默认属性才能生效
                    // stream.playerContext.play()
                    // console.log(TAG_NAME, 'REMOTE_VIDEO_ADD playerContext.play()', stream)
                    this._emitter.emit(EVENT.REMOTE_VIDEO_ADD, {
                        userID: stream.userID,
                        streamType: stream.streamType
                    });
                });
                console.log(
                    TAG_NAME,
                    'REMOTE_VIDEO_ADD',
                    'streamList:',
                    this.streamList,
                    'userList:',
                    this.userList
                );
            });
            // 视频状态 false
            this.userController.on(EVENT.REMOTE_VIDEO_REMOVE, (event) => {
                console.log(
                    TAG_NAME,
                    '远端视频移除',
                    event,
                    event.data.stream.userID
                );
                const stream = event.data.stream;
                this._setList({
                    userList: event.data.userList,
                    streamList: event.data.streamList
                }).then(() => {
                    // 有可能先触发了退房事件，用户名下的所有stream都已清除
                    if (stream.userID && stream.streamType) {
                        this._emitter.emit(EVENT.REMOTE_VIDEO_REMOVE, {
                            userID: stream.userID,
                            streamType: stream.streamType
                        });
                    }
                });
                console.log(
                    TAG_NAME,
                    'REMOTE_VIDEO_REMOVE',
                    'streamList:',
                    this.streamList,
                    'userList:',
                    this.userList
                );
            });
            // 音频可用
            this.userController.on(EVENT.REMOTE_AUDIO_ADD, (event) => {
                console.log(TAG_NAME, '远端音频可用', event);
                const stream = event.data.stream;
                this._setList({
                    userList: event.data.userList,
                    streamList: event.data.streamList
                }).then(() => {
                    stream.playerContext = wx.createLivePlayerContext(
                        stream.streamID,
                        this
                    );
                    // 新增的需要触发一次play 默认属性才能生效
                    // stream.playerContext.play()
                    // console.log(TAG_NAME, 'REMOTE_AUDIO_ADD playerContext.play()', stream)
                    this._emitter.emit(EVENT.REMOTE_AUDIO_ADD, {
                        userID: stream.userID,
                        streamType: stream.streamType
                    });
                });
                console.log(
                    TAG_NAME,
                    'REMOTE_AUDIO_ADD',
                    'streamList:',
                    this.streamList,
                    'userList:',
                    this.userList
                );
            });
            // 音频不可用
            this.userController.on(EVENT.REMOTE_AUDIO_REMOVE, (event) => {
                console.log(
                    TAG_NAME,
                    '远端音频移除',
                    event,
                    event.data.stream.userID
                );
                const stream = event.data.stream;
                this._setList({
                    userList: event.data.userList,
                    streamList: event.data.streamList
                }).then(() => {
                    // 有可能先触发了退房事件，用户名下的所有stream都已清除
                    if (stream.userID && stream.streamType) {
                        this._emitter.emit(EVENT.REMOTE_AUDIO_REMOVE, {
                            userID: stream.userID,
                            streamType: stream.streamType
                        });
                    }
                });
                console.log(
                    TAG_NAME,
                    'REMOTE_AUDIO_REMOVE',
                    'streamList:',
                    this.streamList,
                    'userList:',
                    this.userList
                );
            });
        },
        /**
         * pusher event handler
         * @param {*} event 事件实例
         */
        _pusherStateChangeHandler(event) {
            const code = event.detail.code;
            const message = event.detail.message;
            console.log(TAG_NAME, 'pusherStateChange：', code, event);
            switch (code) {
                case 0: // 未知状态码，不做处理
                    console.log(TAG_NAME, message, code);
                    break;
                case 1001:
                    console.log(TAG_NAME, '已经连接推流服务器', code);
                    break;
                case 1002:
                    console.log(
                        TAG_NAME,
                        '已经与服务器握手完毕,开始推流',
                        code
                    );
                    break;
                case 1003:
                    console.log(TAG_NAME, '打开摄像头成功', code);
                    break;
                case 1004:
                    console.log(TAG_NAME, '录屏启动成功', code);
                    break;
                case 1005:
                    console.log(TAG_NAME, '推流动态调整分辨率', code);
                    break;
                case 1006:
                    console.log(TAG_NAME, '推流动态调整码率', code);
                    break;
                case 1007:
                    console.log(TAG_NAME, '首帧画面采集完成', code);
                    break;
                case 1008:
                    console.log(TAG_NAME, '编码器启动', code);
                    break;
                case 1018:
                    console.log(TAG_NAME, '进房成功', code);
                    this._emitter.emit(EVENT.LOCAL_JOIN, {
                        userID: this.pusher.userID
                    });
                    break;
                case 1019:
                    console.log(TAG_NAME, '退出房间', code);
                    // 20200421 iOS 仍然没有1019事件通知退房，退房事件移动到 exitRoom 方法里，但不是后端通知的退房成功
                    // this._emitter.emit(EVENT.LOCAL_LEAVE, { userID: this.pusher.userID })
                    break;
                case 2003:
                    console.log(TAG_NAME, '渲染首帧视频', code);
                    break;
                case 1020:
                case 1031:
                case 1032:
                case 1033:
                case 1034:
                    // 通过 userController 处理 1020 1031 1032 1033 1034
                    this.userController.userEventHandler(event);
                    break;
                case -1301:
                    console.error(TAG_NAME, '打开摄像头失败: ', code);
                    this._emitter.emit(EVENT.ERROR, { code, message });
                    break;
                case -1302:
                    console.error(TAG_NAME, '打开麦克风失败: ', code);
                    this._emitter.emit(EVENT.ERROR, { code, message });
                    break;
                case -1303:
                    console.error(TAG_NAME, '视频编码失败: ', code);
                    this._emitter.emit(EVENT.ERROR, { code, message });
                    break;
                case -1304:
                    console.error(TAG_NAME, '音频编码失败: ', code);
                    this._emitter.emit(EVENT.ERROR, { code, message });
                    break;
                case -1307:
                    console.error(TAG_NAME, '推流连接断开: ', code);
                    this._emitter.emit(EVENT.ERROR, { code, message });
                    break;
                case -100018:
                    console.error(
                        TAG_NAME,
                        '进房失败: userSig 校验失败，请检查 userSig 是否填写正确',
                        code,
                        message
                    );
                    this._emitter.emit(EVENT.ERROR, { code, message });
                    break;
                case 5000:
                    console.log(TAG_NAME, '小程序被挂起: ', code);
                    // 20200421 iOS 微信点击胶囊圆点会触发该事件
                    // 触发 5000 后，底层SDK会退房，返回前台后会自动进房
                    break;
                case 5001:
                    // 20200421 仅有 Android 微信会触发该事件
                    console.log(TAG_NAME, '小程序悬浮窗被关闭: ', code);
                    this.status.isPending = true;
                    if (this.status.isPush) {
                        this.exitRoom();
                    }
                    break;
                case 1021:
                    console.log(
                        TAG_NAME,
                        '网络类型发生变化，需要重新进房',
                        code
                    );
                    break;
                case 2007:
                    console.log(TAG_NAME, '本地视频播放loading: ', code);
                    break;
                case 2004:
                    console.log(TAG_NAME, '本地视频播放开始: ', code);
                    break;
                default:
                    console.log(TAG_NAME, message, code);
            }

            this._emitter.emit(EVENT.LOCAL_STATE_UPDATE, event);
        },
        _pusherNetStatusHandler(event) {
            // 触发 LOCAL_NET_STATE_UPDATE
            this._emitter.emit(EVENT.LOCAL_NET_STATE_UPDATE, event);
        },
        _pusherErrorHandler(event) {
            // 触发 ERROR
            console.warn(TAG_NAME, 'pusher error', event);
            try {
                const code = event.detail.errCode;
                const message = event.detail.errMsg;
                this._emitter.emit(EVENT.ERROR, { code, message });
            } catch (exception) {
                console.error(
                    TAG_NAME,
                    'pusher error data parser exception',
                    event,
                    exception
                );
            }
        },
        _pusherBGMStartHandler(event) {
            // 触发 BGM_START 已经在playBGM方法中进行处理
            // this._emitter.emit(EVENT.BGM_PLAY_START, { data: event })
        },
        _pusherBGMProgressHandler(event) {
            // BGM_PROGRESS
            this._emitter.emit(EVENT.BGM_PLAY_PROGRESS, event);
        },
        _pusherBGMCompleteHandler(event) {
            // BGM_COMPLETE
            this._emitter.emit(EVENT.BGM_PLAY_COMPLETE, event);
        },
        _pusherAudioVolumeNotify: function (event) {
            // console.log(TAG_NAME, '_pusherAudioVolumeNotify', event)
            this._emitter.emit(EVENT.LOCAL_AUDIO_VOLUME_UPDATE, event);
        },
        // player event handler
        // 获取 player ID 再进行触发
        _playerStateChange(event) {
            // console.log(TAG_NAME, '_playerStateChange', event)
            this._emitter.emit(EVENT.REMOTE_STATE_UPDATE, event);
        },
        _playerFullscreenChange(event) {
            // console.log(TAG_NAME, '_playerFullscreenChange', event)
            this._emitter.emit(EVENT.REMOTE_FULLSCREEN_UPDATE, event);
            this._emitter.emit(EVENT.VIDEO_FULLSCREEN_UPDATE, event);
        },
        _playerNetStatus(event) {
            // console.log(TAG_NAME, '_playerNetStatus', event)
            // 获取player 视频的宽高
            const stream = this.userController.getStream({
                userID: event.currentTarget.dataset.userid,
                streamType: event.currentTarget.dataset.streamtype
            });
            if (
                stream &&
                (stream.videoWidth !== event.detail.info.videoWidth ||
                    stream.videoHeight !== event.detail.info.videoHeight)
            ) {
                console.log(
                    TAG_NAME,
                    '_playerNetStatus update video size',
                    event
                );
                stream.videoWidth = event.detail.info.videoWidth;
                stream.videoHeight = event.detail.info.videoHeight;
            }
            this._emitter.emit(EVENT.REMOTE_NET_STATE_UPDATE, event);
        },
        _playerAudioVolumeNotify(event) {
            // console.log(TAG_NAME, '_playerAudioVolumeNotify', event)
            this._emitter.emit(EVENT.REMOTE_AUDIO_VOLUME_UPDATE, event);
        },
        _filterVisibleStream(streamList, skipPagination) {
            const list = streamList.filter((item) => {
                // 全部显示
                // return true
                // 只显示有视频或者有音频的 stream
                return item.hasVideo || item.hasAudio;
            });
            // 按 userID 进行排序
            list.sort((item1, item2) => {
                const id1 = item1.userID.toUpperCase();
                const id2 = item2.userID.toUpperCase();
                if (id1 < id2) {
                    return -1;
                }
                if (id1 > id2) {
                    return 1;
                }
                return 0;
            });
            if (this.template === 'grid' && !skipPagination) {
                this._filterGridPageVisibleStream(list);
                // console.log(TAG_NAME, '_filterVisibleStream gridPagePlaceholderStreamList:', this.gridPagePlaceholderStreamList)
                if (
                    // list.length > this.gridPlayerPerPage - 2 &&
                    this.gridCurrentPage > 1 &&
                    this.gridPagePlaceholderStreamList.length ===
                        this.gridPlayerPerPage
                ) {
                    // 如果stream 数量大于每页可显示数量，当前页面已经没有可显示的stream(占位数量==3) 回到上一个页面。
                    this._gridPageToPrev(list);
                }
            }
            // console.log(TAG_NAME, '_filterVisibleStream list:', list)
            return list;
        },
        _filterGridPageVisibleStream(list) {
            // 最多只显示 gridPlayerPerPage 个stream
            const length = list.length;
            // +1 pusher
            this.gridPageCount = Math.ceil(
                (length + 1) / this.gridPlayerPerPage
            );
            this.gridPagePlaceholderStreamList = [];
            let visibleCount = 0;
            // 需要显示的player区间
            let interval;
            if (this.gridPlayerPerPage > 3) {
                if (this.gridCurrentPage === 1) {
                    interval = [-1, this.gridPlayerPerPage - 1];
                } else {
                    // 每页显示4个时，第一页显示3个，pusher只在第一页
                    // -1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14
                    //    1     2       3        4
                    // -1 3
                    // 2 7
                    // 6 11
                    interval = [
                        this.gridCurrentPage * this.gridPlayerPerPage -
                            (this.gridPlayerPerPage + 2),
                        this.gridCurrentPage * this.gridPlayerPerPage - 1
                    ];
                }
            } else {
                // 每页显示3个，每页都有pusher
                interval = [
                    this.gridCurrentPage * this.gridPlayerPerPage -
                        (this.gridPlayerPerPage + 1),
                    this.gridCurrentPage * this.gridPlayerPerPage
                ];
            }

            for (let i = 0; i < length; i++) {
                if (i > interval[0] && i < interval[1]) {
                    list[i].isVisible = true;
                    list[i].muteVideo =
                        list[i].muteVideoPrev === undefined
                            ? list[i].muteVideo
                            : list[i].muteVideoPrev;
                    visibleCount++;
                } else {
                    list[i].isVisible = false;
                    list[i].muteVideo = true;
                }
            }
            // 第一页，不需要占位
            if (this.gridCurrentPage !== 1) {
                for (
                    let i = 0;
                    i < this.gridPlayerPerPage - visibleCount;
                    i++
                ) {
                    this.gridPagePlaceholderStreamList.push({
                        id: 'holder-' + i
                    });
                }
            }
            return list;
        },
        /**
         * 保持屏幕常亮
         */
        _keepScreenOn() {
            setInterval(() => {
                wx.setKeepScreenOn({
                    keepScreenOn: true
                });
            }, 20000);
        },
        //  ______  __       __        ______             __                                              __
        //  |      \|  \     /  \      |      \           |  \                                            |  \
        //   \$$$$$$| $$\   /  $$       \$$$$$$ _______  _| $$_     ______    ______   _______    ______  | $$
        //    | $$  | $$$\ /  $$$        | $$  |       \|   $$ \   /      \  /      \ |       \  |      \ | $$
        //    | $$  | $$$$\  $$$$        | $$  | $$$$$$$\\$$$$$$  |  $$$$$$\|  $$$$$$\| $$$$$$$\  \$$$$$$\| $$
        //    | $$  | $$\$$ $$ $$        | $$  | $$  | $$ | $$ __ | $$    $$| $$   \$$| $$  | $$ /      $$| $$
        //   _| $$_ | $$ \$$$| $$       _| $$_ | $$  | $$ | $$|  \| $$$$$$$$| $$      | $$  | $$|  $$$$$$$| $$
        //  |   $$ \| $$  \$ | $$      |   $$ \| $$  | $$  \$$  $$ \$$     \| $$      | $$  | $$ \$$    $$| $$
        //   \$$$$$$ \$$      \$$       \$$$$$$ \$$   \$$   \$$$$   \$$$$$$$ \$$       \$$   \$$  \$$$$$$$ \$$

        /**
         * 初始化 IM SDK
         * @param {Object} config sdkAppID
         */
        _initIM(config) {
            if (!config.enableIM || !config.sdkAppID || this.tim) {
                return;
            }
            console.log(TAG_NAME, '_initIM', config);
            // 初始化 sdk 实例
            const tim = TIM.create({
                SDKAppID: config.sdkAppID
            });
            // 0 普通级别，日志量较多，接入时建议使用
            // 1 release级别，SDK 输出关键信息，生产环境时建议使用
            // 2 告警级别，SDK 只输出告警和错误级别的日志
            // 3 错误级别，SDK 只输出错误级别的日志
            // 4 无日志级别，SDK 将不打印任何日志
            if (config.debugMode) {
                tim.setLogLevel(1);
            } else {
                tim.setLogLevel(4);
            }
            // 取消监听
            tim.off(TIM.EVENT.SDK_READY, this._onIMReady);
            tim.off(TIM.EVENT.MESSAGE_RECEIVED, this._onIMMessageReceived);
            tim.off(TIM.EVENT.SDK_NOT_READY, this._onIMNotReady);
            tim.off(TIM.EVENT.KICKED_OUT, this._onIMKickedOut);
            tim.off(TIM.EVENT.ERROR, this._onIMError);
            // 监听事件
            tim.on(TIM.EVENT.SDK_READY, this._onIMReady, this);
            tim.on(TIM.EVENT.MESSAGE_RECEIVED, this._onIMMessageReceived, this);
            tim.on(TIM.EVENT.SDK_NOT_READY, this._onIMNotReady, this);
            tim.on(TIM.EVENT.KICKED_OUT, this._onIMKickedOut, this);
            tim.on(TIM.EVENT.ERROR, this._onIMError, this);
            this.tim = tim;
            wx.tim = tim;
        },
        _loginIM(params) {
            if (!this.tim) {
                return;
            }
            console.log(TAG_NAME, '_loginIM', params);
            return this.tim.login({
                userID: params.userID,
                userSig: params.userSig
            });
        },
        _logoutIM() {
            if (!this.tim) {
                return;
            }
            console.log(TAG_NAME, '_logoutIM');
            return this.tim.logout();
        },
        _exitIM() {
            // 方法需要调用限制，否则重复解散群 退群会有warn
            if (this.exitIMThrottle || !this.tim) {
                return;
            }
            this.exitIMThrottle = true;
            const userList = this.getRemoteUserList();
            const roomID = this.config.roomID;
            const userID = this.config.userID;
            this._searchGroup({ roomID })
                .then((imResponse) => {
                    // 查询群资料，判断是否为群主
                    if (
                        imResponse.data.group.ownerID === userID &&
                        userList.length === 0
                    ) {
                        // 如果 userList 为 0 群主可以解散群，并登出IM
                        this._dismissGroup({ roomID })
                            .then(() => {
                                this.exitIMThrottle = false;
                                this._logoutIM();
                            })
                            .catch((imError) => {
                                this.exitIMThrottle = false;
                                this._logoutIM();
                            });
                    } else if (imResponse.data.group.ownerID === userID) {
                        this.exitIMThrottle = false;
                        // 群主不能退群只能登出
                        this._logoutIM();
                    } else {
                        // 普通成员退群并登出IM
                        this._quitGroup({ roomID })
                            .then(() => {
                                this.exitIMThrottle = false;
                                this._logoutIM();
                            })
                            .catch((imError) => {
                                this.exitIMThrottle = false;
                                this._logoutIM();
                            });
                    }
                })
                .catch((imError) => {
                    this.exitIMThrottle = false;
                    // 查询异常直接登出
                    this._logoutIM();
                });
        },
        _searchGroup(params) {
            if (!this.tim) {
                return;
            }
            console.log(TAG_NAME, '_searchGroup', params);
            const tim = this.tim;
            const promise = tim.searchGroupByID(params.roomID + '');
            promise
                .then(function (imResponse) {
                    // const group = imResponse.data.group // 群组信息
                    console.log(TAG_NAME, '_searchGroup success', imResponse);
                })
                .catch(function (imError) {
                    console.warn(
                        TAG_NAME,
                        '_searchGroup fail，TIM 报错信息不影响后续逻辑，可以忽略',
                        imError
                    ); // 搜素群组失败的相关信息
                });
            return promise;
        },
        /**
         * 创建 AVchatroom
         * @param {*} params roomID
         * @returns {Promise}
         */
        _createGroup(params) {
            if (!this.tim) {
                return;
            }
            console.log(TAG_NAME, '_createGroup', params);
            const promise = this.tim.createGroup({
                groupID: params.roomID + '',
                name: params.roomID + '',
                type: IM_GROUP_TYPE
            });
            promise
                .then((imResponse) => {
                    // 创建成功
                    console.log(
                        TAG_NAME,
                        '_createGroup success',
                        imResponse.data.group
                    ); // 创建的群的资料
                })
                .catch((imError) => {
                    console.warn(TAG_NAME, '_createGroup error', imError); // 创建群组失败的相关信息
                });
            return promise;
        },
        /**
         * 进入 AVchatroom
         * @param {*} params roomID
         * @returns {Promise}
         */
        _joinGroup(params) {
            if (!this.tim) {
                return;
            }
            console.log(TAG_NAME, '_joinGroup', params);
            const promise = this.tim.joinGroup({
                groupID: params.roomID + '',
                type: IM_GROUP_TYPE
            });
            promise
                .then((imResponse) => {
                    switch (imResponse.data.status) {
                        case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
                            break;
                        case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
                        case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
                            // console.log(imResponse.data.group) // 加入的群组资料
                            // wx.showToast({
                            //   title: '进群成功',
                            // })
                            console.log(
                                TAG_NAME,
                                '_joinGroup success',
                                imResponse
                            );
                            break;
                        default:
                            break;
                    }
                })
                .catch((imError) => {
                    console.warn(TAG_NAME, 'joinGroup error', imError); // 申请加群失败的相关信息
                });
            return promise;
        },
        _quitGroup(params) {
            if (!this.tim) {
                return;
            }
            console.log(TAG_NAME, '_quitGroup', params);
            const promise = this.tim.quitGroup(params.roomID + '');
            promise
                .then((imResponse) => {
                    console.log(TAG_NAME, '_quitGroup success', imResponse);
                })
                .catch((imError) => {
                    console.warn(TAG_NAME, 'quitGroup error', imError);
                });
            return promise;
        },
        _dismissGroup(params) {
            if (!this.tim) {
                return;
            }
            console.log(TAG_NAME, '_dismissGroup', params);
            const promise = this.tim.dismissGroup(params.roomID + '');
            promise
                .then((imResponse) => {
                    console.log(TAG_NAME, '_dismissGroup success', imResponse);
                })
                .catch((imError) => {
                    console.warn(TAG_NAME, '_dismissGroup error', imError);
                });
            return promise;
        },
        _onIMReady(event) {
            console.log(TAG_NAME, 'IM.READY', event);
            this._emitter.emit(EVENT.IM_READY, event);
            const roomID = this.config.roomID;
            // 查询群组是否存在
            this._searchGroup({ roomID })
                .then((res) => {
                    // console.log(TAG_NAME, 'searchGroup', res)
                    // 存在直接进群
                    this._joinGroup({ roomID });
                })
                .catch(() => {
                    // 不存在则创建，如果是avchatroom 创建后进群
                    this._createGroup({ roomID })
                        .then((res) => {
                            // 进群
                            this._joinGroup({ roomID });
                        })
                        .catch((imError) => {
                            if (imError.code === 10021) {
                                console.log(
                                    TAG_NAME,
                                    '群已存在，直接进群',
                                    event
                                );
                                this._joinGroup({ roomID });
                            }
                        });
                });
            // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
            // event.name - TIM.EVENT.IM_READY
        },
        _onIMMessageReceived(event) {
            // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
            console.log(TAG_NAME, 'IM.MESSAGE_RECEIVED', event);
            // messageList 仅保留10条消息
            const messageData = event.data;
            const roomID = this.config.roomID + '';
            const userID = this.config.userID + '';
            for (let i = 0; i < messageData.length; i++) {
                const message = messageData[i];
                // console.log(TAG_NAME, 'IM.MESSAGE_RECEIVED', message, this.config, TIM.TYPES.MSG_TEXT)
                if (message.to === roomID + '' || message.to === userID) {
                    // 遍历messageData 获取当前room 或者当前user的消息
                    console.log(
                        TAG_NAME,
                        'IM.MESSAGE_RECEIVED',
                        message,
                        message.type,
                        TIM.TYPES.MSG_TEXT
                    );
                    if (message.type === TIM.TYPES.MSG_TEXT) {
                        this._pushMessageList({
                            name: message.from,
                            message: message.payload.text
                        });
                    } else {
                        if (
                            message.type === TIM.TYPES.MSG_GRP_SYS_NOTICE &&
                            message.payload.operationType === 2
                        ) {
                            // 群系统通知
                            this._pushMessageList({
                                name: '系统通知',
                                message: `欢迎 ${userID}`
                            });
                        }
                        // 其他消息暂不处理
                    }
                }
            }
            this._emitter.emit(EVENT.IM_MESSAGE_RECEIVED, event);
        },
        _onIMNotReady(event) {
            console.log(TAG_NAME, 'IM.NOT_READY', event);
            this._emitter.emit(EVENT.IM_NOT_READY, event);
            // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
            // event.name - TIM.EVENT.IM_NOT_READY
        },
        _onIMKickedOut(event) {
            console.log(TAG_NAME, 'IM.KICKED_OUT', event);
            this._emitter.emit(EVENT.IM_KICKED_OUT, event);
            // 收到被踢下线通知
            // event.name - TIM.EVENT.KICKED_OUT
            // event.data.type - 被踢下线的原因，例如 :
            //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
            //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
            //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢。使用前需要将SDK版本升级至v2.4.0或以上。
        },
        _onIMError(event) {
            console.log(TAG_NAME, 'IM.ERROR', event);
            this._emitter.emit(EVENT.IM_ERROR, event);
            // 收到 SDK 发生错误通知，可以获取错误码和错误信息
            // event.name - TIM.EVENT.ERROR
            // event.data.code - 错误码
            // event.data.message - 错误信息
        },

        //  ________                                  __             __
        //  |        \                                |  \           |  \
        //   \$$$$$$$$______   ______ ____    ______  | $$  ______  _| $$_     ______
        //     | $$  /      \ |      \    \  /      \ | $$ |      \|   $$ \   /      \
        //     | $$ |  $$$$$$\| $$$$$$\$$$$\|  $$$$$$\| $$  \$$$$$$\\$$$$$$  |  $$$$$$\
        //     | $$ | $$    $$| $$ | $$ | $$| $$  | $$| $$ /      $$ | $$ __ | $$    $$
        //     | $$ | $$$$$$$$| $$ | $$ | $$| $$__/ $$| $$|  $$$$$$$ | $$|  \| $$$$$$$$
        //     | $$  \$$     \| $$ | $$ | $$| $$    $$| $$ \$$    $$  \$$  $$ \$$     \
        //      \$$   \$$$$$$$ \$$  \$$  \$$| $$$$$$$  \$$  \$$$$$$$   \$$$$   \$$$$$$$
        //                                  | $$
        //                                  | $$
        //                                   \$$
        // 以下为 debug & template 相关函数

        _toggleVideo() {
            if (this.pusher.enableCamera) {
                this.unpublishLocalVideo();
            } else {
                this.publishLocalVideo();
            }
        },
        _toggleAudio() {
            if (this.pusher.enableMic) {
                this.unpublishLocalAudio();
            } else {
                this.publishLocalAudio();
            }
        },
        _debugToggleRemoteVideo(event) {
            console.log(
                TAG_NAME,
                '_debugToggleRemoteVideo',
                event.currentTarget.dataset
            );
            const userID = event.currentTarget.dataset.userID;
            const streamType = event.currentTarget.dataset.streamType;
            const stream = this.streamList.find((item) => {
                return item.userID === userID && item.streamType === streamType;
            });
            if (stream.muteVideo) {
                this.subscribeRemoteVideo({ userID, streamType });
                // this.setViewVisible({ userID, streamType, isVisible: true })
            } else {
                this.unsubscribeRemoteVideo({ userID, streamType });
                // this.setViewVisible({ userID, streamType, isVisible: false })
            }
        },
        _debugToggleRemoteAudio(event) {
            console.log(
                TAG_NAME,
                '_debugToggleRemoteAudio',
                event.currentTarget.dataset
            );
            const userID = event.currentTarget.dataset.userID;
            const streamType = event.currentTarget.dataset.streamType;
            const stream = this.streamList.find((item) => {
                return item.userID === userID && item.streamType === streamType;
            });
            if (stream.muteAudio) {
                this.subscribeRemoteAudio({ userID });
            } else {
                this.unsubscribeRemoteAudio({ userID });
            }
        },
        _debugToggleVideoDebug() {
            this.debug = !this.debug;
        },
        _debugExitRoom() {
            this.exitRoom();
        },
        _debugEnterRoom() {
            Object.assign(this.pusher, this.config);
            this.enterRoom({ roomID: this.config.roomID }).then(() => {
                setTimeout(() => {
                    this.publishLocalVideo();
                    this.publishLocalAudio();
                }, 2000);
                // 进房后开始推送视频或音频
            });
        },
        _debugGoBack() {
            wx.navigateBack({
                delta: 1
            });
        },
        _debugTogglePanel() {
            this.debugPanel = !this.debugPanel;
        },
        _debugSendRandomMessage() {
            const userList = this.getRemoteUserList();
            if (userList.length === 0 || !this.tim) {
                return false;
            }
            const roomID = this.config.roomID;
            const message = `Hello! ${userList[0].userID} ${
                9999 * Math.random()
            }`;
            const userID = userList[0].userID;

            this.sendC2CTextMessage({
                userID: userID,
                message: message
            });
            const promise = this.sendGroupTextMessage({
                roomID: roomID,
                message: message
            });
            // 消息上屏
            this._pushMessageList({
                name: userID,
                message: message
            });

            promise
                .then(function (imResponse) {
                    // 发送成功
                    console.log(
                        TAG_NAME,
                        '_debugSendRandomMessage success',
                        imResponse
                    );
                    wx.showToast({
                        title: '发送成功',
                        icon: 'success',
                        duration: 1000
                    });
                })
                .catch(function (imError) {
                    // 发送失败
                    console.warn(
                        TAG_NAME,
                        '_debugSendRandomMessage error',
                        imError
                    );
                    wx.showToast({
                        title: '发送失败',
                        icon: 'none',
                        duration: 1000
                    });
                });
        },
        _toggleAudioVolumeType() {
            if (this.pusher.audioVolumeType === 'voicecall') {
                this._setPusherConfig({
                    audioVolumeType: 'media'
                });
            } else {
                this._setPusherConfig({
                    audioVolumeType: 'voicecall'
                });
            }
        },
        _toggleSoundMode() {
            if (this.userList.length === 0) {
                return;
            }
            const stream = this.userController.getStream({
                userID: this.userList[0].userID,
                streamType: 'main'
            });
            if (stream) {
                if (stream.soundMode === 'speaker') {
                    stream['soundMode'] = 'ear';
                } else {
                    stream['soundMode'] = 'speaker';
                }
                this._setPlayerConfig({
                    userID: stream.userID,
                    streamType: 'main',
                    config: {
                        soundMode: stream['soundMode']
                    }
                });
            }
        },
        /**
         * 退出通话
         */
        _hangUp() {
            this.exitRoom();
            // wx.navigateBack({
            // 	delta: 1
            // });
        },
        /**
         * 切换订阅音频状态
         */
        handleSubscribeAudio() {
            if (this.pusher.enableMic) {
                this.unpublishLocalAudio();
            } else {
                this.publishLocalAudio();
            }
        },
        /**
         * 切换订阅远端视频状态
         * @param {Object} event native 事件对象
         */
        _handleSubscribeRemoteVideo(event) {
            console.log(TAG_NAME, '_handleSubscribeRemoteVideo', event);
            const userID = event.currentTarget.dataset.userID;
            const streamType = event.currentTarget.dataset.streamType;
            const stream = this.streamList.find((item) => {
                return item.userID === userID && item.streamType === streamType;
            });
            if (stream.muteVideo) {
                this.subscribeRemoteVideo({ userID, streamType });
            } else {
                this.unsubscribeRemoteVideo({ userID, streamType });
            }
        },
        /**
         *
         * @param {Object} event native 事件对象
         */
        _handleSubscribeRemoteAudio(event) {
            const userID = event.currentTarget.dataset.userID;
            const streamType = event.currentTarget.dataset.streamType;
            const stream = this.streamList.find((item) => {
                return item.userID === userID && item.streamType === streamType;
            });
            if (stream.muteAudio) {
                this.subscribeRemoteAudio({ userID });
            } else {
                this.unsubscribeRemoteAudio({ userID });
            }
        },
        /**
         * grid布局, 唤起 memberlist-panel
         */
        _switchMemberListPanel() {
            this.panelName =
                this.panelName !== 'memberlist-panel' ? 'memberlist-panel' : '';
        },
        /**
         * grid布局, 唤起 setting-panel
         */
        _switchSettingPanel() {
            this.panelName =
                this.panelName !== 'setting-panel' ? 'setting-panel' : '';
        },
        _switchBGMPanel() {
            this.panelName = this.panelName !== 'bgm-panel' ? 'bgm-panel' : '';
        },
        _handleMaskerClick() {
            this.panelName = '';
        },

        _setPuserProperty(event) {
            console.log(TAG_NAME, '_setPuserProperty', event);
            const key = event.currentTarget.dataset.key;
            const valueType = event.currentTarget.dataset.valueType;
            let value = event.currentTarget.dataset.value;
            const config = {};
            if (valueType === 'boolean') {
                value = value === 'true' ? true : false;
                config[key] = !this.pusher[key];
            }
            if (valueType === 'number' && value.indexOf('|') > 0) {
                value = value.split('|');
                // console.log(this.pusher, this.pusher[key], key, value)
                if (this.pusher[key] === Number(value[0])) {
                    config[key] = Number(value[1]);
                } else {
                    config[key] = Number(value[0]);
                }
            }
            if (valueType === 'string' && value.indexOf('|') > 0) {
                value = value.split('|');
                if (this.pusher[key] === value[0]) {
                    config[key] = value[1];
                } else {
                    config[key] = value[0];
                }
            }
            this._setPusherConfig(config);
        },
        _setPlayerProperty(event) {
            console.log(TAG_NAME, '_setPlayerProperty', event);
            const userID = event.currentTarget.dataset.userid;
            const streamType = event.currentTarget.dataset.streamtype;
            const key = event.currentTarget.dataset.key;
            let value = event.currentTarget.dataset.value;
            const stream = this.userController.getStream({
                userID: userID,
                streamType: streamType
            });
            if (!stream) {
                return;
            }
            const config = {};
            if (value === 'true') {
                value = true;
            } else if (value === 'false') {
                value = false;
            }
            if (typeof value === 'boolean') {
                config[key] = !stream[key];
            } else if (typeof value === 'string' && value.indexOf('|') > 0) {
                value = value.split('|');
                if (stream[key] === value[0]) {
                    config[key] = value[1];
                } else {
                    config[key] = value[0];
                }
            }
            console.log(TAG_NAME, '_setPlayerProperty', config);
            this._setPlayerConfig({ userID, streamType, config });
        },
        _changeProperty(event) {
            const propertyName = event.currentTarget.dataset.propertyName;
            const newData = {};
            newData[propertyName] = event.detail.value;
            this[propertyName] = event.detail.value;
            const volume = newData[propertyName] / 100;
            switch (propertyName) {
                case 'MICVolume':
                    this.setMICVolume({ volume });
                    break;
                case 'BGMVolume':
                    this.setBGMVolume({ volume });
                    break;
            }
        },
        _switchStreamType(event) {
            console.log(TAG_NAME, '_switchStreamType', event);
            const userID = event.currentTarget.dataset.userid;
            const streamType = event.currentTarget.dataset.streamtype;
            const stream = this.userController.getStream({
                userID: userID,
                streamType: streamType
            });
            if (stream && stream.streamType === 'main') {
                if (stream._definitionType === 'small') {
                    this.subscribeRemoteVideo({ userID, streamType: 'main' });
                } else {
                    this.subscribeRemoteVideo({ userID, streamType: 'small' });
                }
            }
        },
        _handleSnapshotClick(event) {
            wx.showToast({
                title: '开始截屏',
                icon: 'none',
                duration: 1000
            });
            const userID = event.currentTarget.dataset.userid;
            const streamType = event.currentTarget.dataset.streamtype;
            this.snapshot({ userID, streamType });
        },
        /**
         * grid布局, 绑定事件
         */
        _gridBindEvent() {
            // 远端音量变更
            this.on(EVENT.REMOTE_AUDIO_VOLUME_UPDATE, (event) => {
                const data = event.data;
                const userID = data.currentTarget.dataset.userid;
                const streamType = data.currentTarget.dataset.streamtype;
                const volume = data.detail.volume;
                // console.log(TAG_NAME, '远端音量变更', userID, streamType, volume, event)
                const stream = this.userController.getStream({
                    userID: userID,
                    streamType: streamType === 'aux' ? 'main' : streamType // 远端推辅流后，音量回调会从辅流的 player 返回，而不是主流player 返回。需要等 native SDK修复。
                });
                if (stream) {
                    stream.volume = volume;
                }
                this.visibleStreamList = this._filterVisibleStream(
                    this.streamList,
                    true
                );
            });
            this.on(EVENT.BGM_PLAY_PROGRESS, (event) => {
                // console.log(TAG_NAME, '_gridBindEvent on BGM_PLAY_PROGRESS', event)
                const BGMProgress =
                    (event.data.detail.progress / event.data.detail.duration) *
                    100;
                this.BGMProgress = BGMProgress;
            });
            this.on(EVENT.LOCAL_AUDIO_VOLUME_UPDATE, (event) => {
                // console.log(TAG_NAME, '_gridBindEvent on LOCAL_AUDIO_VOLUME_UPDATE', event)
                // const data = event.data
                const volume = event.data.detail.volume;
                // 避免频繁输出log
                this._setPusherConfig({ volume }, true);
            });
        },
        _handleGridTouchStart(event) {
            touchX = event.changedTouches[0].clientX;
            touchY = event.changedTouches[0].clientY;
        },
        _handleGridTouchEnd(event) {
            const x = event.changedTouches[0].clientX;
            const y = event.changedTouches[0].clientY;

            if (x - touchX > 50 && Math.abs(y - touchY) < 50) {
                // console.log(TAG_NAME, '向右滑 当前页面', this.gridCurrentPage, this.gridPageCount)
                this._gridPagePrev();
            } else if (x - touchX < -50 && Math.abs(y - touchY) < 50) {
                // console.log(TAG_NAME, '向左滑 当前页面', this.gridCurrentPage, this.gridPageCount)
                this._gridPageNext();
            }
        },
        _gridPageToPrev(streamList) {
            const visibleStreamList =
                this._filterGridPageVisibleStream(streamList);
            if (
                this.gridPagePlaceholderStreamList.length ===
                this.gridPlayerPerPage
            ) {
                this.gridCurrentPage--;
                this._gridPageToPrev(streamList);
            } else {
                return visibleStreamList;
            }
        },
        _gridPageNext() {
            this.gridCurrentPage++;
            if (this.gridCurrentPage > this.gridPageCount) {
                this.gridCurrentPage = 1;
            }
            this._gridPageSetData();
        },
        _gridPagePrev() {
            this.gridCurrentPage--;
            if (this.gridCurrentPage < 1) {
                this.gridCurrentPage = this.gridPageCount;
            }
            this._gridPageSetData();
        },
        _gridPageSetData() {
            this._gridShowPageTips();
            const visibleStreamList = this._filterVisibleStream(
                this.streamList
            );
            this.visibleStreamList = visibleStreamList;
        },
        _gridShowPageTips(event) {
            if (this.gridPageCount < 2) {
                return;
            }
            console.log(TAG_NAME, '_gridShowPageTips', this);
            if (this.hasGridPageTipsShow) {
                clearTimeout(this.hasGridPageTipsShow);
            }
            this.animate('.pages-container', [{ opacity: 1 }], 100, () => {});
            this.hasGridPageTipsShow = setTimeout(() => {
                this.animate(
                    '.pages-container',
                    [{ opacity: 1 }, { opacity: 0.3 }],
                    600,
                    () => {}
                );
            }, 3000);
        },
        _toggleFullscreen(event) {
            console.log(TAG_NAME, '_toggleFullscreen', event);
            const userID = event.currentTarget.dataset.userID;
            const streamType = event.currentTarget.dataset.streamType;
            if (this._isFullscreen) {
                this.exitFullscreen({ userID, streamType })
                    .then(() => {
                        this._isFullscreen = false;
                    })
                    .catch(() => {});
            } else {
                // const stream = this.userController.getStream({ userID, streamType })
                const direction = 0;
                // 已知问题：视频的尺寸需要等待player触发NetStatus事件才能获取到，如果进房就双击全屏，全屏后的方向有可能不对。
                // if (stream && stream.videoWidth && stream.videoHeight) {
                //   // 如果是横视频，全屏时进行横屏处理。如果是竖视频，则为0
                //   direction = stream.videoWidth > stream.videoHeight ? 90 : 0
                // }
                this.enterFullscreen({ userID, streamType, direction })
                    .then(() => {
                        this._isFullscreen = true;
                    })
                    .catch(() => {});
            }
        },
        _toggleMoreMenu() {
            this.isShowMoreMenu = !this.isShowMoreMenu;
        },
        _toggleIMPanel() {
            if (!this.enableIM) {
                wx.showToast({
                    icon: 'none',
                    title: '当前没有开启IM功能，请设置 enableIM:true'
                });
            }
            this.showIMPanel = !this.showIMPanel;
        },
        _handleBGMOperation(event) {
            const operationName = event.currentTarget.dataset.operationName;
            if (this[operationName]) {
                this[operationName]({
                    url: 'https://trtc-1252463788.cos.ap-guangzhou.myqcloud.com/web/assets/bgm-test.mp3'
                });
            }
        },
        _selectBeautyStyle: function (event) {
            console.log(TAG_NAME, '_selectBeautyStyle', event);
            // this.beauty = (event.detail.value === 'close' ? 0 : 9)
            const value = event.detail.value;
            this.beautyStyle = value;
            this.$nextTick(() => {
                this._setPusherConfig({
                    beautyLevel: value === 'close' ? 0 : 9,
                    beautyStyle: value === 'close' ? 'smooth' : value
                });
            });
        },
        _selectFilter: function (event) {
            console.log(TAG_NAME, '_selectFilter', event);
            const index = parseInt(event.detail.value);
            this.filterIndex = index;
            this.$nextTick(() => {
                this._setPusherConfig({
                    filter: this.filterArray[index].value
                });
            });
        },
        _selectAudioReverbType: function (event) {
            console.log(TAG_NAME, '_selectAudioReverbType', event);
            const audioReverbType = parseInt(event.detail.value);
            this._setPusherConfig({ audioReverbType });
        },
        _sendIMMessage(event) {
            console.log(TAG_NAME, '_sendIMMessage', event);
            if (!this.messageContent) {
                return;
            }
            const roomID = this.config.roomID;
            const message = this.messageContent;
            const userID = this.config.userID;
            this.sendGroupTextMessage({ roomID, message });
            // 消息上屏
            this._pushMessageList({
                name: userID,
                message: message
            });
            this.messageContent = '';
        },
        _inputIMMessage(event) {
            // console.log(TAG_NAME, '_inputIMMessage', event)
            this.messageContent = event.detail.value;
        },
        _pushMessageList(params) {
            if (this.messageList.length === this.maxMessageListLength) {
                this.messageList.shift();
            }
            this.messageList.push(params);
            this.messageListScrollTop = this.messageList.length * 100;
        }
    }
};
</script>

<style>
/* 9人 会议模版 */
.template-grid {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    /* display: flex;
	  flex-direction: row;
	  flex-wrap: wrap; */
}
.column-layout {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.column-layout .column-1 {
    flex: 1;
}
.column-layout .column-2 {
    position: relative;
    height: 100rpx;
    background-color: rgb(36, 36, 36);
}

.fullscreen-device-fix .column-layout .column-2 {
    height: 120rpx;
}
.menu {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.menu .menu-item {
    text-align: center;
    height: 100rpx;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.menu .menu-item .image {
    width: 46rpx;
    height: 46rpx;
}
.more-menu {
    position: absolute;
    top: 0;
}
.more-menu .scroll-container {
    width: 100%;
    height: 100rpx;
    white-space: nowrap;
}
.more-menu .menu-item-container {
    width: 20%;
    display: inline-block;
}

.template-grid .grid-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.template-grid .grid-scroll-container {
    width: 100%;
    height: 100%;
    /* box-sizing: border-box; */
    /* overflow-y: scroll; */
    background-color: #000;
}
.grid-containe.overflow {
    height: auto;
}
.template-grid .view-container {
    position: relative;
}

.stream-0 .view-container {
    width: 100%;
    height: 100%;
}

.stream-1 .view-container {
    width: 100%;
    height: 50%;
}

.stream-2 .view-container {
    width: 50%;
    height: 50%;
}

.stream-2 .view-container:nth-child(1) {
    width: 100%;
    height: 50%;
}

.stream-3 .view-container {
    width: 50%;
    height: 50%;
}

.stream-4 .view-container {
    width: 50%;
    height: 33.3%;
}

.stream-4 .view-container:nth-child(1) {
    width: 100%;
    height: 33.3%;
}

.stream-5 .view-container {
    width: 50%;
    height: 33.3%;
}

.stream-6 .view-container {
    width: 33.3%;
    height: 33.3%;
}

.stream-6 .view-container:nth-child(1) {
    width: 100%;
    height: 33.3%;
}

.stream-7 .view-container {
    width: 33.3%;
    height: 33.3%;
}

.stream-7 .view-container:nth-child(1) {
    width: 50%;
    height: 33.3%;
}

.stream-7 .view-container:nth-child(2) {
    width: 50%;
    height: 33.3%;
}

.stream-8 .view-container {
    width: 33.3%;
    height: 33.3%;
}

.stream-even .view-container {
    width: 50%;
    height: 50%;
}

.stream-odd .view-container {
    width: 50%;
    height: 50%;
}
.stream-odd .view-container:last-child {
    width: 100%;
    height: 50%;
}

.template-grid .operation-bar {
    position: absolute;
    bottom: 6rpx;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.operation-bar .operation-item-container {
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: rgb(0, 0, 0, 0.3);
    border-radius: 10rpx;
}
.template-grid .operation-bar .operation-item {
    width: 64rpx;
    height: 64rpx;
    /* flex-grow: 1; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.operation-item .item-image {
    width: 36rpx;
    height: 36rpx;
}
.template-grid .volume-progress {
    width: 100%;
    position: absolute;
    bottom: 0;
}

.template-grid .btn-normal {
    width: 64rpx;
    height: 64rpx;
    margin: 0 6rpx;
    box-sizing: border-box;
    display: flex;
    background: rgba(255, 255, 255, 1);
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}

.template-grid .btn-normal .btn-image {
    width: 36rpx;
    height: 36rpx;
}

.template-grid .btn-hangup {
    background: #f75c45;
}

.template-grid .panel {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    width: 90vw;
    height: auto;
    z-index: 999;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    color: white;
    display: flex;
    flex-direction: column;
    padding: 20rpx 0;
    border-radius: 10rpx;
    box-sizing: border-box;
    font-size: 14px;
}
.panel .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 10px;
}
.panel .panel-header {
    text-align: center;
    padding-bottom: 20rpx;
}
.panel .panel-tips {
    color: #999;
    text-align: center;
}
.panel .panel-body {
    flex: 1;
    max-height: 50vh;
}
.panel .panel-body .scroll-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

.memberlist-panel .panel-body {
    height: 50vh;
}
.memberlist-panel .member-item {
    display: flex;
    /* border-bottom: 1px solid #999; */
    margin: 16rpx 16rpx 16rpx 32rpx;
}
.memberlist-panel .member-id {
    width: 30%;
    font-size: 12px;
    line-height: 64rpx;
}
.memberlist-panel .member-btns {
    width: 70%;
    display: flex;
    justify-content: flex-end;
}
.memberlist-panel .member-btns .btn-normal {
    margin-left: 0;
}
.memberlist-panel .member-btns .btn {
    margin-right: 0;
}

.setting-panel .panel-body {
    height: 50vh;
}
.setting-panel .setting-option {
    display: flex;
    justify-content: space-between;
    margin: 16rpx 16rpx 16rpx 32rpx;
    /* box-sizing: border-box;
	  padding: 12rpx 16rpx 12rpx 32rpx; */
}
.setting-panel .setting-option .label {
    /* line-height: 64rpx; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.setting-panel .setting-switch {
    transform: scale(0.8);
    margin-right: -12rpx;
}

.bgm-panel .panel-body {
    height: auto;
}
.bgm-panel .setting-option {
    height: 60rpx;
    display: flex;
    flex-direction: row;
    margin: 16rpx 16rpx 16rpx 32rpx;
}
.bgm-panel .setting-option .label {
    width: 140rpx;
    line-height: 60rpx;
}
.bgm-panel .setting-option .slider-content {
    flex: 1;
    line-height: 60rpx;
}
.bgm-panel .setting-option .slider-content slider {
    transform: scale(0.9);
    margin: 0;
}

.bgm-panel .setting-option .slider-content progress {
    transform: scale(0.9);
    margin-top: 28rpx;
}
.bgm-panel .menu {
    padding: 16rpx 32rpx 16rpx 32rpx;
    box-sizing: border-box;
}
.bgm-panel .menu .menu-item {
    height: 80rpx;
    background-color: #333;
}

.template-grid .masker {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
}

.template-grid .no-stream,
.template-grid .no-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 12px;
}
.template-grid .audio-volume,
.template-grid .no-audio {
    position: absolute;
    bottom: 20rpx;
    left: 20rpx;
    width: 36rpx;
    height: 36rpx;
}

.no-stream .image,
.no-video .image {
    width: 60rpx;
    height: 60rpx;
}

.audio-volume .image,
.no-audio .image {
    width: 36rpx;
    height: 36rpx;
    position: absolute; /*android 的bug ，image absolute后会向上漂移几个像素，如果要对其必须都设置absolute*/
}

.audio-active {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    overflow: hidden;
}
.audio-active .image {
    bottom: 0;
}

.slide-up-tips {
    position: absolute;
    bottom: -100rpx;
    left: 50%;
    transform: translate(-50%, 0);
    width: 200rpx;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 12px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    padding: 20rpx;
    border-radius: 10rpx;
    opacity: 0;
}
.slide-up-tips .image {
    width: 100rpx;
    height: 100rpx;
}
.player-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.player-placeholder .image {
    width: 100rpx;
    height: 100rpx;
}

.pages-container {
    width: auto;
    left: 50%;
    transform: translate(-50%, 0);
    height: 20rpx;
    position: absolute;
    bottom: 12%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.pages-container .page-item {
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
    margin: 0 8rpx;
    background-color: rgb(99, 99, 99, 0.5);
}
.pages-container .page-item.current {
    background-color: #fff;
}

.radio-group-no-box {
    display: inline-block;
    color: #006eff;
    background-color: #ffffff;
    border: 1px solid #006eff;
    border-radius: 4px;
    margin-left: 180rpx;
    font-size: 12px;
}
.radio-group-no-box .radio-item {
    padding: 5px 8px;
    text-align: center;
    border-right: 1px solid #006eff;
    display: inline-block;
}
.radio-group-no-box .radio-item:last-child {
    border-right: none;
}
.radio-group-no-box .radio-item.selected {
    color: #ffffff;
    background-color: #006eff;
}
.radio-group-no-box radio {
    display: none;
}

.picker-label {
    display: inline-block;
    color: #006eff;
    background-color: #ffffff;
    border: 1px solid #006eff;
    border-radius: 4px;
    padding: 5px 8px;
    text-align: center;
    font-size: 12px;
}

.pusher {
    width: 100%;
    height: 100%;
}

.player {
    width: 100%;
    height: 100%;
}

.debug-info {
    max-width: 100vw;
    max-height: 90vh;
    box-sizing: border-box;
    overflow-y: scroll;
    position: absolute;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    bottom: 20rpx;
    left: 0;
    padding: 10rpx;
    font-size: 12px;
}
.debug-info-btn .debug-btn,
.debug-info .debug-btn {
    padding: 0 8px;
    min-height: 18px;
    width: auto;
    font-size: 12px;
    line-height: 18px;
    display: inline-block;
    color: #06ae56;
    background-color: #f2f2f2;
}
.debug-info .debug-btn.false {
    color: rgb(114, 114, 114);
}
.debug-info-btn .debug-btn,
.debug-info .button-hover {
    background-color: rgb(219, 219, 219);
}
.debug-info .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 10px;
}
.debug-info .text.true {
    color: #1fff8b;
}
.debug-info .text.false {
    color: #ff2e2e;
}
.debug-info-btn {
    position: absolute;
    z-index: 9998;
    bottom: 160rpx;
    left: 0;
}

.trtc-room-container .btn {
    display: inline-block;
    width: auto;
    height: 60rpx;
    min-height: 60rpx;
    line-height: 60rpx;
    font-size: 12px;
    font-weight: normal;
    padding: 0 10rpx;
    color: #006eff;
    background-color: #f2f2f2;
    margin: 0 16rpx;
}
.trtc-room-container .btn.active {
    color: #f2f2f2;
    background-color: #006eff;
}
.trtc-room-container .btn-hover {
    background-color: #d1d1d1;
}

.im-panel {
    position: absolute;
    z-index: 9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90vw;
    height: 320rpx;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    padding: 20rpx 0;
    border-radius: 10rpx;
    font-size: 12px;
    /* bottom: 25vh; */
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
}
.im-panel .close-btn {
    position: absolute;
    top: 0;
    right: -3px;
    padding: 5px 10px;
    z-index: 99;
}
.message-panel-body {
    width: 100%;
    height: 80%;
    overflow-x: hidden;
    overflow-y: scroll;
}
.message-scroll-container {
    height: 100%;
    /* box-sizing: border-box;
	  padding: 0 20rpx; */
}
.message-list {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20rpx;
    /* display: flex;
	  flex-direction: column; */
}
.message-item {
    width: 100%;
    /* height: 36rpx; */
    /* padding: 0 20rpx; */
    padding-bottom: 10rpx;
    display: flex;
    flex-direction: row;
}
.message-item .user-name {
    width: 20%;
    color: #2483ff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.user-name.mine {
    color: #ff7424;
}
.message-item .separate {
    padding: 0 5px;
    color: #fff;
}
.message-item .message-content {
    word-wrap: break-word;
    word-break: break-all;
    padding-left: 20rpx;
    position: relative;
    max-width: 80%;
    box-sizing: border-box;
}
.message-content::after {
    content: ':';
    position: absolute;
    left: 0;
    top: 0;
}
.message-panel-bottom {
    width: 100%;
    height: 50rpx;
    box-sizing: border-box;
    padding: 0 20rpx 0;
    margin-top: 20rpx;
    display: flex;
    flex-direction: row;
}
.message-input-container {
    flex-grow: 1;
}
.message-input-container .message-input {
    font-size: 12px;
    padding-left: 20rpx;
    border-radius: 10rpx;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
}
.message-send-btn .btn {
    margin-right: 0;
    height: 50rpx;
    min-height: 50rpx;
    line-height: 50rpx;
}

.volume-animation {
    position: absolute;
    width: 80rpx;
    height: 80rpx;
    left: 0;
    top: initial;
    bottom: 20rpx;
    z-index: 9;
    /* transform: translate(-50%, 0); */
}
.volume-animation .image {
    position: absolute;
    width: 80rpx;
    height: 80rpx;
}
.volume-animation .audio-active {
    animation: viewlinear 1.5s linear infinite;
}
@keyframes viewlinear {
    /** 第一种写法**/
    0% {
        height: 0;
    }
    100% {
        height: 100%;
    }
}

.none,
.view-container.none,
.template-grid .view-container.none,
.template-1v1 .view-container.none {
    display: none !important;
}
</style>
