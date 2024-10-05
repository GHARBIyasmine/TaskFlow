import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent<T> {
  
  @ContentChild('itemTemplate') 
  itemTemplate!: TemplateRef<{ $implicit: T }>;
  
  @Input() items!: T[];

}
