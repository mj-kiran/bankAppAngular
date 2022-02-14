import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  acno=""
  pswd=""
  amount=""


  acno1=""
  pswd1=""
  amount1=""

  depositForm=this.fb.group({

    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
   amount:['',[Validators.required,Validators.pattern('[0-9]*')]]


  })

  withdrawForm=this.fb.group({

    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
   amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]


  })


  user:any
  //= this.ds.currentUserName

  // acno=""

  constructor(private ds:DataService, private fb:FormBuilder, private router:Router) { 
    if(localStorage.getItem("currentUserName")){
    this.user=JSON.parse(localStorage.getItem("currentUserName") ||"")
    }
  }

  ngOnInit(): void {
  }

  deposit(){
    var acno=this.depositForm.value.acno
    var pswd=this.depositForm.value.pswd
    var amount=this.depositForm.value.amount

    if(this.depositForm.valid){
      this.ds.deposit(acno,pswd,amount).subscribe((result:any)=>{
        if (result){
          alert(result.message)
          
        }
      
      },
    (result:any)=> {
          alert(result.error.message);
        }
      )

    

    // alert("Deposit Clicked!!!!!")
  }
  else{
    alert("Invalid Form")
  }
  }

 

  withdraw(){

    var acno=this.withdrawForm.value.acno1
    var pswd=this.withdrawForm.value.pswd1
    var amount=this.withdrawForm.value.amount1

   if(this.withdrawForm.valid){
    this.ds.withdraw(acno,pswd,amount).subscribe((result:any)=>{
      if (result){
        alert(result.message)
        
      }
      
    },
  (result:any)=> {
        alert(result.error.message);
      }
    ) 
}

  else{
    alert("invalid form")
  }

  }

  deleteFromParent(){
    this.acno=JSON.parse(localStorage.getItem("currentAcno") || '')

   }

  delete(event:any){
    // alert("Message from parent"+event)
    this.ds.delete(event).subscribe((result:any)=>{
      if(result){
        alert(result.message)
        this.router.navigateByUrl("")
      }
      
    },
    (result)=>{
      alert(result.error.message)

    }
    )

  }
  cancel(){
    this.acno=""
  }

}
