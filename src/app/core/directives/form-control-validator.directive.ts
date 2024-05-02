import { Directive, ElementRef, Inject, input, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import {  maxLength, minLength, noLeadTrailSpace, required, validMail } from '../utils/util';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[frm-ctrl-val]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: FormControlValidatorDirective,
    multi: true,
  }],
})
export class FormControlValidatorDirective implements Validator, OnInit{
  @Input() valueRequired: boolean=false;
  @Input() valueRequiredError:string="Value is required";
  @Input() parent: any;
  @Input() blockLeadTrailSpace:boolean=false;
  @Input() blockLeadTrailSpaceError:string=`Value must not start or end with empty space)`;
  @Input() minLen: number=0;
  @Input() minLenError:string="Value is less than min length";
  @Input() maxLen: number=0;
  @Input() maxLenError:string=`Value is greater than max length`;
  @Input() validMail:boolean=false;
  @Input() confirmPsw:string[]=[];//controlname for psw and confirmpsw
  controlName:string="unknown";
  currentError=""
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  
  }
  addErrorLabel()
  {
    const exist =this.document.getElementById(this.controlName+"Error");
    if(!exist  || this.currentError!=exist.innerHTML)
    {
      if(!exist)
      {
        const child = this.document.createElement('div');
        child.innerText=this.currentError;
        child.id=this.controlName+"Error"
        this.renderer.appendChild(this.parent, child);
        this.renderer.setStyle(child, `color`, `red`);
        this.renderer.setStyle(child, `font-size`, `small`);
      }
      else
      {
        this.renderer.setProperty(exist, 'innerHTML', this.currentError);  
      }

    }
  }
  removeErrorLabel()
  {
    const child = this.document.getElementById(this.controlName+"Error");
    if(child)
    {
    this.renderer.removeChild(this.parent, child);
    child.remove();
    }
  }
  setControlName(control:AbstractControl)
  {
    Object.keys(control.parent.controls).forEach(key => {
      let childControl = control.parent.get(key);
      if (childControl !== control) {
        return;
      }
      this.controlName= key;
    });
  }
  public validate(control: AbstractControl): ValidationErrors | null {
    var result:any=null;
    this.setControlName(control);
    if(this.validMail){
       result=validMail()(control);
       if(result!=null && (control.touched || control.dirty))
       {
        this.currentError="Email not valid";
        this.addErrorLabel()
        return result;
       }
       else 
          this.removeErrorLabel()
        }
    if(this.valueRequired){
      result=required()(control);
      if(result!=null && (control.touched || control.dirty))
      {
        this.currentError=this.valueRequiredError;
       this.addErrorLabel()
       return result;
      }
      else 
         this.removeErrorLabel()
    }

    if(this.blockLeadTrailSpace)
    {
     result=noLeadTrailSpace()(control);
     if(result!=null && (control.touched || control.dirty))
     {
       this.currentError=this.blockLeadTrailSpaceError;
       this.addErrorLabel()
       return result;
     }
     else 
        this.removeErrorLabel()
    }

   if(this.minLen>0)
   {
    result=minLength(this.minLen)(control);
    if(result!=null && (control.touched || control.dirty))
    {
      this.currentError=this.minLenError;
      this.addErrorLabel()
      return result;
    }
    else 
       this.removeErrorLabel()
   }
   if(this.maxLen>0){
    result=maxLength(this.maxLen)(control);
    if(result!=null && (control.touched || control.dirty))
    {
      this.currentError=this.maxLenError;
     this.addErrorLabel()
     return result;
    }
    else 
       this.removeErrorLabel()
     }
    return result;
  }

}
