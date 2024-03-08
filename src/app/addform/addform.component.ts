import { Component, OnInit } from '@angular/core';
import { AddAddressInfoDto, AddCandidateInfoModel, AddEducationalInfoDto, Gender, Proficiency, AddSkillsDto, AddPersonalInfoDto, GetCandidateInfoModel, GetAddressInfoDto } from '../form.model';
import { GenderService } from '../Services/gender.service';
import { ProficiencyService } from '../Services/proficiency.service';
import moment from 'moment'; 
import { CoreService } from '../core/core.service';
import { DetailsService } from '../Services/details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrl: './addform.component.css',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AddformComponent implements OnInit{
  genders: Gender[] = [];
  proficiencies: Proficiency[] = [];
  saveClicked: boolean = false;
  dataId!: string;
  info!: GetCandidateInfoModel;
  addressFieldsAdded: boolean = false;
  noWhitespacePattern: string = '^(?!\\s)(?!.*\\s$).*$';
  maxDate: Date = new Date();

  candidateForm: AddCandidateInfoModel = {
    personalInfoDto: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      mobileNumber: null,
      genderId: 0
    },
    educationalInfoDto: [],
    addressInfoDto: [],
    skillsDto: []
  }
  step = 0;

  constructor(
    private _genderService: GenderService,
    private _proficiency: ProficiencyService,
    private _coreService: CoreService,
    private _detailService: DetailsService,
    private route: ActivatedRoute,
    private router: Router,
  ){
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
   
    if (idParam !== null) {
      this.dataId = idParam;
      this._detailService.getInfoById(this.dataId).subscribe((data) => {
        this.updateForm(data);
      });
    }

    this._genderService.getGenders().subscribe((data) => {
      this.genders = data;
    });

    this._proficiency.getProficiency().subscribe((data) => {
      this.proficiencies = data;
    });

    this.candidateForm.educationalInfoDto.push(this.createEducationForm());
    // this.candidateForm.addressInfoDto.push(this.createAddressForm());
    this.candidateForm.addressInfoDto = [this.createAddressForm(), this.createAddressForm()]
    this.candidateForm.skillsDto.push(this.createSkillsForm());
  }

  createAddressForm(locality: string = '', city: string = '', state: string = '', zipCode: number | null = null, country: string = ''): AddAddressInfoDto {
    return {
      addressId: '',
      locality: locality,
      city: city,
      state: state,
      zipCode: zipCode,
      country: country
    };
  }

  createSkillsForm(): AddSkillsDto {
    return {
      skillName: '',
      skillProficiencyId: 0
    };
  }

  createEducationForm(): AddEducationalInfoDto {
    return {
      instituteName: '',
      degree: '',
      startDate: '',
      endDate: ''
    };
  }

  addEducation(): void {
    this.candidateForm.educationalInfoDto.push(this.createEducationForm());
  }

  addAddress(): void {
    this.candidateForm.addressInfoDto.push(this.createAddressForm());
    this.addressFieldsAdded = true;
  }

  copyAddress: boolean = false;

  addressesAreEqual(): boolean {
    const firstAddress = this.candidateForm.addressInfoDto[0];
    const secondAddress = this.candidateForm.addressInfoDto[1];
  
    return secondAddress && 
           firstAddress.locality === secondAddress.locality && 
           firstAddress.city === secondAddress.city && 
           firstAddress.state === secondAddress.state && 
           firstAddress.zipCode === secondAddress.zipCode && 
           firstAddress.country === secondAddress.country;
  }

  copyAddressToSecond(): void {
    const firstAddress = this.candidateForm.addressInfoDto[0];
    let secondAddress;
    if (this.candidateForm.addressInfoDto[1] && this.candidateForm.addressInfoDto[1].locality !== firstAddress.locality && this.candidateForm.addressInfoDto[1].zipCode !== firstAddress.zipCode){
      secondAddress = this.copyAddress ? { 
        addressId: this.candidateForm.addressInfoDto[1].addressId,
        locality: firstAddress.locality,
        city: firstAddress.city,
        state: firstAddress.state,
        country: firstAddress.country,
        zipCode: firstAddress.zipCode,
        ...(this.copyAddress ? {} : this.candidateForm.addressInfoDto[1])
      } : this.createAddressForm();
    }
    else{
      secondAddress = this.copyAddress ? this.createAddressForm(firstAddress.locality, firstAddress.city, firstAddress.state, firstAddress.zipCode, firstAddress.country) : this.createAddressForm();
    }
    
    this.candidateForm.addressInfoDto[1] = secondAddress;
  }


  addskills(): void {
    this.candidateForm.skillsDto.push(this.createSkillsForm())
  }

  removeEducation(index: number) {
    this.candidateForm.educationalInfoDto.splice(index, 1); 
    if (this.dataId) {
      this._detailService.getInfoById(this.dataId).subscribe((data) => {
        this.info = data;
        console.log(data);
        console.log(this.info.educationalInfoDto[index].educationalId)
  
        if (this.info && this.info.educationalInfoDto[index].educationalId) {
          this._detailService.deleteInfo(this.info.educationalInfoDto[index].educationalId, "educationalinfo").subscribe({
            next: (val: any) => {
            this._coreService.openSnackBar('Details deleted', 'Success');
            },
            error: (err: any) => {
              this._coreService.openSnackBar(
                'Error while deleting record',
                'Failed'
              );
              console.error(err);
            },
          });
        } else {
            console.error("Invalid info or educationalId");
        };
      });
    }  
  }

  removeAddress(index: number) {
    this.candidateForm.addressInfoDto.splice(index, 1); 
    this.addressFieldsAdded = false;
    if (this.dataId) {
      this._detailService.getInfoById(this.dataId).subscribe((data) => {
        this.info = data;
        console.log(data);
        console.log(this.info.addressInfoDto[index].addressId)
  
        if (this.info && this.info.addressInfoDto[index].addressId) {
          this._detailService.deleteInfo(this.info.addressInfoDto[index].addressId, "addressinfo").subscribe({
            next: (val: any) => {
            this._coreService.openSnackBar('Details deleted', 'Success');
            },
            error: (err: any) => {
              this._coreService.openSnackBar(
                'Error while deleting record',
                'Failed'
              );
              console.error(err);
            },
          });
        } else {
            console.error("Invalid info or addressId");
        };
      });
    } 
  }

  removeSkill(index: number){
    this.candidateForm.skillsDto.splice(index, 1);
    if (this.dataId) {
      this._detailService.getInfoById(this.dataId).subscribe((data) => {
        this.info = data;
        console.log(data);
        console.log(this.info.skillsDto[index].skillId)
  
        if (this.info && this.info.skillsDto[index].skillId) {
          this._detailService.deleteInfo(this.info.skillsDto[index].skillId, "skills").subscribe({
            next: (val: any) => {
            this._coreService.openSnackBar('Details deleted', 'Success');
            },
            error: (err: any) => {
              this._coreService.openSnackBar(
                'Error while deleting record',
                'Failed'
              );
              console.error(err);
            },
          });
        } else {
            console.error("Invalid info or skillId");
        };
      });
    }
  }

  isFormValid(): { isValid: boolean; errorMess: string } {
    let isValid = true;
    let errorMess = '';

    if (this.candidateForm.personalInfoDto.firstName === '') {
      errorMess = 'Personal Information : FirstName should not be empty.';
      isValid = false;
    } else if (this.candidateForm.personalInfoDto.emailAddress === '') {
      errorMess = 'Personal Information : Email Address should not be empty.';
      isValid = false;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,4}$/.test(this.candidateForm.personalInfoDto.emailAddress)) {
      errorMess = 'Personal Information : Please enter a valid Email Address.';
      isValid = false;
    } else if (this.candidateForm.personalInfoDto.mobileNumber === 0 || this.candidateForm.personalInfoDto.mobileNumber === null) {
      errorMess = 'Personal Information : Mobile Number should not be empty.';
      isValid = false;
    } else if (!/^\d{10}$/.test(String(this.candidateForm.personalInfoDto.mobileNumber))) {
      errorMess = 'Personal Information : Mobile Number should be a 10 digit number.';
      isValid = false;
    } else if (this.candidateForm.personalInfoDto.genderId === 0 || this.candidateForm.personalInfoDto.genderId === undefined) {
      errorMess = 'Personal Information : Please select a Gender.';
      isValid = false;
    } 

    if (isValid){
      for (let i = 0; i < this.candidateForm.addressInfoDto.length; i++) {
        const address = this.candidateForm.addressInfoDto[i];
        if (address.locality === '') {
          errorMess = 'Address Information : Locality should not be empty.';
          isValid = false;
          break; 
        } else if (address.city === '') {
          errorMess = 'Address Information : City should not be empty.';
          isValid = false;
          break; 
        } else if (address.state === '') {
          errorMess = 'Address Information : State should not be empty.';
          isValid = false;
          break; 
        } else if (address.zipCode === 0 || address.zipCode === null) {
          errorMess = 'Address Information : ZipCode should not be empty.';
          isValid = false;
          break; 
        } else if (!/^\d{6}$/.test(String(address.zipCode))) {
          errorMess = 'Address Information : ZipCode should be a 6 digit number.';
          isValid = false;
          break; 
        } else if (address.country === '') {
          errorMess = 'Address Information : Country should not be empty.';
          isValid = false;
          break;
        }
      }
    }
    
    if (isValid){
      for (let i = 0; i < this.candidateForm.educationalInfoDto.length; i++) {
        const education = this.candidateForm.educationalInfoDto[i];
        if (education.instituteName === '') {
          errorMess = 'Educational Information : Institute Name should not be empty.';
          isValid = false;
          break; 
        } else if (education.degree === '') {
          errorMess = 'Educational Information : Degree should not be empty.';
          isValid = false;
          break; 
        } else if (education.startDate === '' || !education.startDate) {
          errorMess = 'Educational Information : StartDate should not be empty.';
          isValid = false;
          break; 
        } else if (this.isDateExceedMaxDate(education.startDate)) {
          errorMess = "Educational Information : Don't exceed StartDate from today's date.";
          isValid = false;
          break; 
        } else if (education.endDate === '' || !education.endDate) {
          errorMess = 'Educational Information : EndDate should not be empty.';
          isValid = false;
          break;
        } else if (this.isDateExceedMaxDate(education.endDate)) {
          errorMess = "Educational Information : Don't exceed EndDate from today's date.";
          isValid = false;
          break;  
        }
      }
    }
    
    if (isValid){
      for (let i = 0; i < this.candidateForm.skillsDto.length; i++) {
        const skill = this.candidateForm.skillsDto[i];
        if (skill.skillName === '') {
          errorMess = 'Skills : Skill should not be empty.';
          isValid = false;
          break; 
        } else if (skill.skillProficiencyId === 0 || skill.skillProficiencyId === undefined) {
          errorMess = 'Skills : Please select a Proficiency.';
          isValid = false;
          break;
        }
      }
    }

    return { isValid, errorMess };
  }

  validateAndExpandPanel() {
    const { isValid, errorMess } = this.isFormValid();
    
    if (!isValid) {
      console.log(errorMess);
      if (errorMess.includes('Personal Information')) {
        this.setStep(0);
      } else if (errorMess.includes('Address Information')) {
        this.setStep(1); 
      } else if (errorMess.includes('Educational Information')) {
        this.setStep(2);
      } else if (errorMess.includes('Skills')) {
        this.setStep(3);
      }
    }
  }
  
  private updateForm(data: GetCandidateInfoModel): void {
    this.candidateForm = { ...data };
    this.candidateForm.personalInfoDto = data.personalInfoDto;
    this.candidateForm.addressInfoDto = data.addressInfoDto;
    this.candidateForm.educationalInfoDto = data.educationalInfoDto;
    this.candidateForm.skillsDto = data.skillsDto;
  }
  
  saveForm(){
    this.saveClicked = true;
    const { isValid, errorMess } = this.isFormValid();
    if (isValid) {
      if (this.dataId) {
        console.log(this.candidateForm)
        this._detailService.updateInfo(this.dataId, this.candidateForm).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Details Updated', 'Success');
            this.router.navigate(['/details']);
          },
          error: (err: any) => {
            this._coreService.openSnackBar(
              err.error ? `${err.error}` : 'Error while updating record',
              'Failed'
            );
            console.error(err);
          },
        });
      } else {
        console.log(this.candidateForm);
        this._detailService.addInfo(this.candidateForm).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Details Added', 'Success');
            this.router.navigate(['/details'])
          },
          error: (err: any) => {
            this._coreService.openSnackBar(err.error ? `${err.error}` : 'Error while adding task', 'Failed');
            console.error(err);
          },
        });
      }
    } else {
      this.validateAndExpandPanel();
      this._coreService.openSnackBar(`${errorMess}`, 'Failed');
    }

  }

  isDateExceedMaxDate(date: string | Date | null): boolean {
    if (!date) {
      return false; 
    }
    const enteredDate = new Date(date);
    return enteredDate > this.maxDate;
  }

  formattedDate(date: string | Date | null | undefined): string {
    if (!date) {
      return '';
    } else if (date instanceof Date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    } else {
      return moment.utc(date).local().format('YYYY-MM-DD');
    }
  }

  updateStartDate(event: any, i: number) {
    const selectedDate = event.value;
    if (!selectedDate || !moment(selectedDate, 'YYYY-MM-DD', true).isValid()) {
      this.candidateForm.educationalInfoDto[i].startDate = ''; 
      return; 
    }
    const formattedDate = this.formattedDate(selectedDate);
    this.candidateForm.educationalInfoDto[i].startDate = formattedDate;
  }

  updateEndDate(event: any, i: number) {
    const selectedDate = event.value;
    if (!selectedDate || !moment(selectedDate, 'YYYY-MM-DD', true).isValid()) {
      this.candidateForm.educationalInfoDto[i].endDate = ''; 
      return; 
    }
    const formattedDate = this.formattedDate(selectedDate);
    this.candidateForm.educationalInfoDto[i].endDate = formattedDate;
  }

  cancel(){
    this.router.navigate(['/details']);
  }

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
}
