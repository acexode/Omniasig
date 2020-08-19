// import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit,ChangeDetectorRef } from '@angular/core';
// import { __spreadArrays } from 'tslib';

// @Component({
//   selector: 'app-faq',
//   templateUrl: './faq.component.html',
//   styleUrls: ['./faq.component.scss'],
// })
// export class FaqComponent implements OnInit, AfterViewInit {
//   icon:string;
//   toggledUp: boolean
//   toggledDown: boolean

//   //create an interface for this 
//   public faqs : Array<{ question: string, answer: string}> = [
//     { 
//        question : 'Google\'s front-end development framework - default option for Ionic development', 
//        answer : 'Phasellus bibendum massa risus, at malesuada felis sodales in. Nulla malesuada turpis vel orci dignissim, ac accumsan felis porttitor. Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
//     },
//     { 
//        question : 'VueJS', 
//        answer : 'Latest cutting edge front-end development framework - can be enabled as an option for Ionic development',
//     },
//     { 
//        question : 'React', 
//        answer : 'Popular front-end development framework from Facebook- can be enabled as an option for Ionic development',
//     },
//     { 
//        question : 'TypeScript', 
//        answer : 'Superset of JavaScript that provides class based object oriented programming and strict data typing',
//     },
//     { 
//        question : 'Ionic Native', 
//        answer : 'Apache Cordova compatible plugins that allow native device API\'s to be utilised',
//     },
//     { 
//        question : 'Capacitor', 
//        answer : 'Plugins for Progressive Web App and hybrid app development',
//     },
//     { 
//        question : 'StencilJS', 
//        answer : 'Custom web component development framework',
//     }
//   ];

//   constructor(private cdRef: ChangeDetectorRef) { 
//       this.icon = "sm-chevron-down-t";
//       this.toggledUp = false;
//       this.toggledDown = true;
//   }

//   ngOnInit() {
//   }

//   ngAfterViewInit() {
//     var acc = document.getElementsByClassName("accordion");
// //console.log("ACCCCCCCCCCCCCCCCC", acc)
//     for (let i = 0; i < acc.length; i++) {
//       acc[i].addEventListener("click", function() {
//         this.classList.toggle("active");
        
//         var panel = this.nextElementSibling;
//         console.log("*********************************************************",this)

//         if (panel.style.maxHeight) {
//          //this.name.value = "sm-chevron-down-t";
//           //this.icon = "sm-chevron-down-t"
//          //this.toggled = false
//           //console.log("I closed", this.icon)
//           panel.style.maxHeight = null;
//         } else {
//          //this.name.value = "sm-chevron-up";
//           //this.icon = "sm-chevron-up";
//           //this.toggled = true;
//           //this.cdRef.detectChanges(); 
//           //console.log("I ran ooo", this.icon)
//           panel.style.maxHeight = panel.scrollHeight + "px";
//         }
//         //this.cdRef.detectChanges(); 
//       });
//     }
//   } 
  

//    setChevronUp(e){
// // console.log("*********************************************************",e.target)
//    //    e.targetName.value
//    //    var acc = document.getElementsByClassName("accordion");

//    //  for (let i = 0; i < acc.length; i++) {
//    //    acc[i].addEventListener("click", function() {
//    //      this.classList.toggle("active");
//    //      var panel = this.nextElementSibling;
//    //      if (panel.style.maxHeight) {
//    //        this.icon = "sm-chevron-down-t"
//    //        this.toggled = false
//    //        console.log("I closed", this.icon)
//    //        //panel.style.maxHeight = null;
//    //      } else {
          
//    //        this.icon = "sm-chevron-up";
//    //        this.toggled = true;
//    //        //this.cdRef.detectChanges(); 
//    //        console.log("I ran ooo", this.icon)
//    //        //panel.style.maxHeight = panel.scrollHeight + "px";
//    //      }
//    //      //this.cdRef.detectChanges(); 
//    //    });
//    //  }

//       // this.toggledUp = true;
//       // this.toggledDown = false;
//    }

//    setChevronDown(e){
//       // console.log("*********************************************************",e.target.name)

//       // this.toggledUp = false;
//       // this.toggledDown = true;
//    }
// }



import {
   Input,
   Component,
   OnInit,
   ViewChild,
   ElementRef,
   Renderer2
 } from "@angular/core";
 
 @Component({
   selector: 'app-faq',
   templateUrl: './faq.component.html',
   styleUrls: ['./faq.component.scss'],
 })
 export class FaqComponent implements OnInit{
   @ViewChild("expandWrapper", { read: ElementRef, static: true })
   expandWrapper: ElementRef;
 
   @Input("expanded") expanded: boolean = false;
   @Input("expandHeight") expandHeight: string = "500px";
 
   icon: string = "chevron-forward-outline";
   accordionExapanded = false;
   @Input("title") title: string;

     public faqs : Array<{ question: string, answer: string}> = [
    { 
       question : 'Google\'s front-end development framework - default option for Ionic development', 
       answer : 'Phasellus bibendum massa risus, at malesuada felis sodales in. Nulla malesuada turpis vel orci dignissim, ac accumsan felis porttitor. Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    { 
       question : 'VueJS', 
       answer : 'Latest cutting edge front-end development framework - can be enabled as an option for Ionic development',
    },
    { 
       question : 'React', 
       answer : 'Popular front-end development framework from Facebook- can be enabled as an option for Ionic development',
    },
    { 
       question : 'TypeScript', 
       answer : 'Superset of JavaScript that provides class based object oriented programming and strict data typing',
    },
    { 
       question : 'Ionic Native', 
       answer : 'Apache Cordova compatible plugins that allow native device API\'s to be utilised',
    },
    { 
       question : 'Capacitor', 
       answer : 'Plugins for Progressive Web App and hybrid app development',
    },
    { 
       question : 'StencilJS', 
       answer : 'Custom web component development framework',
    }
  ];
 
   constructor(public renderer: Renderer2) {}
 
   ngOnInit() {
     this.renderer.setStyle(
       this.expandWrapper.nativeElement,
       "max-height",
       this.expandHeight
     );
   }
 
   toggleAccordion() {
     if (this.accordionExapanded) {
       this.renderer.setStyle(
         this.expandWrapper.nativeElement,
         "max-height",
         "0px"
       );
       this.renderer.setStyle(
         this.expandWrapper.nativeElement,
         "padding",
         "0px 16px"
       );
     } else {
       this.renderer.setStyle(
         this.expandWrapper.nativeElement,
         "max-height",
         "500px"
       );
       this.renderer.setStyle(
         this.expandWrapper.nativeElement,
         "padding",
         "13px 16px"
       );
     }
 
     this.accordionExapanded = !this.accordionExapanded;
     this.icon =
       this.icon == "chevron-down-outline"
         ? "chevron-forward-outline"
         : "chevron-down-outline";
   }
}