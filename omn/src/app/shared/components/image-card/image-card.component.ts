import { Component, OnInit, Input } from '@angular/core';
import { ImageCard } from '../../models/component/image-card';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {
  @Input() item: ImageCard;
  constructor() {}

  ngOnInit() {}
}
