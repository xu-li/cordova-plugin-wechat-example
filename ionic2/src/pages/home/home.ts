import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../app/services/data.service';
import { WechatService } from '../../app/services/wechat.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  scenes  = [];
  buttons = [];

  selectedScene = null;

  constructor(
    public navCtrl: NavController,
    public dataService: DataService,
    public wechatService: WechatService) {

      this.scenes = dataService.getScenes();
      this.buttons = dataService.getButtons();

      this.selectedScene = this.scenes[0];
  }

  sceneSelected(scene) {
    this.selectedScene = scene;
  }

  buttonClicked(button) {
    this.wechatService.share(this.selectedScene.value, button.id);
  }
}
