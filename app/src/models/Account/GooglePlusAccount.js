import Account from './Account';

export default class GooglePlusAccount extends Account{
  constructor(googlePlusAccount){
    super(googlePlusAccount.pers_email);
    this.mapFields(googlePlusAccount);

  }
  mapFields(gpa){
    this.pers_display_name = gpa.displayName;
    this.pers_first_name   = gpa.first_name;
    this.pers_last_name    = gpa.last_name;
    this.pers_picture_url  = gpa.image.url;
    this.pers_language     = gpa.language;
  }
}
