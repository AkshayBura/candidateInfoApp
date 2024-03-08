import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { Router } from '@angular/router';
import { Gender, GetCandidateInfoModel, Proficiency } from '../form.model';
import { DetailsService } from '../Services/details.service';
import { ProficiencyService } from '../Services/proficiency.service';
import { GenderService } from '../Services/gender.service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  genders: Gender[] = [];
  proficiencies: Proficiency[] = [];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<GetCandidateInfoModel>;
  filterValue: string = '';
  originalDataSource: GetCandidateInfoModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('genderSelect') genderSelect!: MatSelect; 

  constructor(
    private router: Router,
    private _coreService: CoreService,
    private _gender: GenderService,
    private _proficiency: ProficiencyService,
    private _detailService: DetailsService
  ) {
    this.dataSource = new MatTableDataSource<GetCandidateInfoModel>([]);
  }

  ngOnInit(): void {
    this.getDetails();

    this._proficiency.getProficiency().subscribe((data) => {
      this.proficiencies = data;
    });

    this._gender.getGenders().subscribe((data) => {
      this.genders = data;
    });
  }

  setDisplayedColumns() {
    this.displayedColumns = [
      // "id",
      'firstName',
      'lastName',
      'emailAddress',
      'mobileNumber',
      'genderId',
      'degree',
      'city',
      'state',
      'skillName',
      'skillProficiencyId',
      'action',
      // "instituteName",
      // "locality",
      // "zipCode",
      // "addressInfo",
      // "educationalInfo",
      // "skills",
    ];
  }

  getProficiencyName(proficiencyId: number): string {
    const proficiency = this.proficiencies.find((p) => p.id === proficiencyId);
    return proficiency ? proficiency.name : '';
  }

  getGenderName(genderId: number): string {
    const gender = this.genders.find((g) => g.id === genderId);
    return gender ? gender.genderName : '';
  }

  getDetails() {
    this._detailService.getInfo().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setDisplayedColumns();
        this.originalDataSource = [...this.dataSource.data];
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });
  }

  filterValues: any = {
    firstName: '',
    email: '',
    mobile: '',
    degree: '',
    skill: '',
    gender: undefined || ''
  };

  applyFilter(event: Event, field: string) {
    this.filterValues[field] = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.applyFilters();
  }

  genderFilter(gender: string){
    this.filterValues['gender'] = gender;

    this.applyFilters();
  }

  applyFilters() {
    const anyFilterPresent =
      Object.values(this.filterValues).some((value: any) => value !== '' && value !== undefined);
  
    if (!anyFilterPresent) {
      this.dataSource.data = [...this.originalDataSource];
    } else {
      this.dataSource.data = this.originalDataSource.filter((item) => {
        const firstNameMatches = this.filterValues.firstName === '' || item.personalInfoDto.firstName.toLowerCase().includes(this.filterValues.firstName);
        const emailMatches = this.filterValues.email === '' || item.personalInfoDto.emailAddress.toLowerCase().includes(this.filterValues.email);
        const mobileMatches = this.filterValues.mobile === '' || String(item.personalInfoDto.mobileNumber).toLowerCase().includes(this.filterValues.mobile);
        const degreeMatches = this.filterValues.degree === '' || item.educationalInfoDto.some((edu) => edu.degree.toLowerCase().includes(this.filterValues.degree));
        const skillMatches = this.filterValues.skill === '' || item.skillsDto.some((skill) => skill.skillName.toLowerCase().includes(this.filterValues.skill));
        const genderMatches = this.filterValues.gender === undefined || String(item.personalInfoDto.genderId).includes(this.filterValues.gender);
  
        return firstNameMatches && emailMatches && mobileMatches && degreeMatches && skillMatches && genderMatches;
      });
    }
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetFilters() {
    this.filterValues = {
      firstName: '',
      email: '',
      mobile: '',
      degree: '',
      skill: '',
      gender: undefined 
    };

    (document.getElementById('firstNameFilter') as HTMLInputElement).value = '';
    (document.getElementById('emailFilter') as HTMLInputElement).value = '';
    (document.getElementById('mobileFilter') as HTMLInputElement).value = '';
    (document.getElementById('degreeFilter') as HTMLInputElement).value = '';
    (document.getElementById('skillFilter') as HTMLInputElement).value = '';

    this.genderSelect.value = 'Clear'; 
  
    this.applyFilters(); 
  }

  onDeleteClick(id: string) {
    this._coreService.openConfirmationDialog().then((result) => {
      if (result) {
        this.deleteTask(id);
      } else {
      }
    });
  }

  deleteTask(id: string) {
    this._detailService.deleteInfo(id, 'candidateinfo').subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Details Deleted', 'Success'),
          this.getDetails();
      },
      error: console.error,
    });
  }

  openAddDetailForm() {
    this.router.navigate(['/detail']);
  }

  openEditDetailForm(id: number) {
    this.router.navigate(['/detail', id]);
  }

  // formatDate(date: Date): string {
  //   const year = date.getFullYear();
  //   const month = ('0' + (date.getMonth() + 1)).slice(-2);
  //   const day = ('0' + date.getDate()).slice(-2);

  //   return `${year}-${month}-${day}`;
  // }
}
