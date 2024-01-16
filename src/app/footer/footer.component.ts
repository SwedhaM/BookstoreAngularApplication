import { Component } from '@angular/core';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  facebook=faFacebook;
  twitter=faTwitter;
  instagram=faInstagram;
  linkedin=faLinkedin;
  constructor() {

    }
}
