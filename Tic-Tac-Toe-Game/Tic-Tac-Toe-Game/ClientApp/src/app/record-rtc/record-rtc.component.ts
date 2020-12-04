import * as RecordRTC from 'recordrtc';
import { Component, OnInit } from '@angular/core';

@ViewChild('video') video: any

ngAfterViewInit() {
    // set the initial state of the video
    let video:HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }