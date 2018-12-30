import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute} from "@angular/router";
import {group} from "@angular/animations";

@Component({
    selector: 'app-association-members',
    templateUrl: './association-members.component.html',
    styleUrls: ['./association-members.component.scss']
})
export class AssociationMembersComponent implements OnInit {

    association: any ;
    groups: any ;
    error: string ;
    status: string ;

    users: any ;
    users_index: any;
    editing = false;

    rightFields = [
        ["Administrateur", "is_admin_group"],
        ["Editer les pages statiques", "static_page"],
        ["Publier des news", "news"],
        ["Accéder au magasin", "marketplace"],
        ["Accéder aux prêts", "library"],
        ["Gérer les votes", "vote"],
        ["Créer des évenements", "events"]
    ];

    constructor(private api: ApiService, private route: ActivatedRoute){}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');

        this.api.get('users/').subscribe(
            users => {
                let users_index = {};
                this.users = users;
                for(let user of (users as Array<any>)){
                    users_index[user.id] = user
                }

                this.api.get("associations/" + id + "/").subscribe(
                    association => {
                        this.association = association;
                        let members = [];

                        for(let m of this.association.members){
                            members.push(this.users_index[m])
                        }

                        this.association.members = members ;
                    },
                    error => this.error = error.message
                );
            },
            error => this.error = error.message
        )
    }

    stopEdit(){
        if(this.association.groups.filter(g => g.is_admin_group).map(g => g.members.length).reduce((sum, current) => sum + current, 0) > 0) {
            this.status = "" ;

            let groups = [];
            for(let group of this.association.groups){
                let members = [];
                for(let m of group.members){
                    let id = m;
                    if(id.hasOwnProperty("id")){
                        id = id.id
                    }

                    members.push(id)
                }
                groups.push({
                    id: group.id ? group.id : -1,
                    members: members,

                    is_admin_group: group.is_admin_group,
                    role: group.role,

                    library: group.library,
                    marketplace: group.marketplace,
                    news: group.news,
                    static_page: group.static_page,
                    vote: group.vote
                })
            }

            console.log(groups)

            this.api.patch(`associations/${this.association.id}/`, {"groups" :groups}).subscribe(
                res => {
                    this.status = "<span class='text-success'>Groupes mis à jour</span>"
                    this.editing = false;
                    this.association = res
                },
                err => { console.log(err) ; this.status = "<span class='text-danger'>" + err.message + "</span>" }
            )

            console.log(this.association)
        } else {
            this.status = "<span class='text-danger'>L'association doit avoir au moins un groupe administrateur qui doit avoir au moins un membre</span>"
        }
    }

    createGroup(){
        this.association.groups.push({
            role: "Nouveau groupe"
        })
    }

    deleteGroup(group) {
        this.association.groups.splice(this.association.groups.indexOf(group), 1)
    }

}
