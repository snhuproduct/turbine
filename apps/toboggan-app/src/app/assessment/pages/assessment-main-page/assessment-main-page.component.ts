import { Component } from '@angular/core';

@Component({
  selector: 'toboggan-ws-assessment-main-page',
  templateUrl: './assessment-main-page.component.html',
  styleUrls: ['./assessment-main-page.component.scss'],
})
export class AssessmentMainPageComponent {
  listBoxData = [
    {
      "title" : "Checkbox Panel (Long)",
      "type": "checkbox",
      "items": [
        { itemText: "option 1", id: "1" },
        { itemText: "option 2", id: "2" },
        { itemText: "option 3", id: "3" },
        { itemText: "option 4", id: "4" },
        { itemText: "option 5", id: "5" },
        { itemText: "option 6", id: "6" },
        { itemText: "option 7", id: "7" },
        { itemText: "option 8", id: "8" },
        { itemText: "option 9", id: "9" },
        { itemText: "option 10", id: "10" }
      ]
    },
    {
      "title" : "Second Panel",
      "type": "checkbox",
      "items": [
        { itemText: "option 1", id: "1" },
        { itemText: "option 2", id: "2" },
        { itemText: "option 3", id: "3" }
      ]
    },
    {
      "title" : "Third Panel",
      "type": "checkbox",
      "items": [
        { itemText: "option 1", id: "1" },
        { itemText: "option 2", id: "2" },
        { itemText: "option 3", id: "3" },
        { itemText: "option 4", id: "4" },
        { itemText: "option 5", id: "5" },
        { itemText: "option 6", id: "6" },
        { itemText: "option 7", id: "7" },
        { itemText: "option 8", id: "8" },
        { itemText: "option 9", id: "9" },
        { itemText: "option 10", id: "10" }
      ]
    },
    {
      "title" : "Radio Panel",
      "type": "radio",
      "items": [
        { itemText: "option 1", id: "1" },
        { itemText: "option 2", id: "2" },
        { itemText: "option 3", id: "3" }
      ]
    },
  ];
}
