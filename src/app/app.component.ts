import { Component, OnInit } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";

@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})
export class AppComponent {
  greetingMessage = "";

/*
  onInit() {
    listen("tauri://file-drop", event => {
      console.log("fd event", event);
    });
  }
  */

  dropped(event: any): void {
    event.preventDefault();
    console.log("received drop", event);
    event.dataTransfer.items[0].getAsString( (s: any)  => {
      console.log("got string " + s);
    });
  }

  dragOver(event: any): void {
    //console.log("dragOver called with event: ", event);
    console.log("dragOver called");
    event.stopPropagation();
    event.preventDefault();
  }

  greet(name: string): void {
    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage = text;
    });
  }
}
