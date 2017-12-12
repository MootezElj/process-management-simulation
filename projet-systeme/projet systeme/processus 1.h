#ifndef DEF_processus
#define DEF_processus
#include<iostream>
#include<string>
#include<math.h>

using namespace std;
class liste_p;
class processus {public:
	string nom;
	int dat_arrive,temp_execution;
	processus* next;
	friend class liste_p;
	public:
		processus(string ch="",int d=-1,int t=-1){
			dat_arrive=d;
			temp_execution=t;
			nom=ch;
			next=NULL;
		}
		void affiche_p(){

			cout<<'\t'<<"--------------------------------"<<endl;
			cout<<'\t'<<"- Nom = "<<nom<<endl;
			cout<<'\t'<<"- Date d'arrive = "<<dat_arrive<<endl;
			cout<<'\t'<<"- Temp d'execution = "<<temp_execution<<endl;
			cout<<'\t'<<"--------------------------------"<<endl<<endl;
		}
		void operator=(processus& p){
			nom=p.nom;
			dat_arrive=p.dat_arrive;
			temp_execution=p.temp_execution;
		}
};
class liste_p{
	public:
	processus *tete;
	public:
	liste_p(){
		tete=NULL;
	}
	~liste_p(){
		processus*p;
		while(tete!=NULL){
			p=tete; tete=tete->next;
			delete p;
		}
	}
	void affiche(){
		processus *aux;
		if(tete==NULL) cout<<endl<<"- La liste est vide !"<<endl;
		else{aux=tete;
			while(aux!=NULL){
				aux->affiche_p();
				aux=aux->next;
			}
		}
	}
	void ajout_fin(processus *p){
		processus*aux;  aux=tete;
		if(tete==NULL){tete=p;}
		else{
	     while(aux->next!=NULL){
	     aux=aux->next; }
		 aux->next=p;
		}
	}
	void ajout_deb(processus *p){
	    p->next=tete;
	    tete=p;
	}
	int taille(){
		processus *aux; aux=tete; int n=0;
		while(aux!=NULL){
			n++; aux=aux->next;
		}
		return n;
	}
	 void operator=(liste_p l){
			processus*aux=l.tete;
			while(aux!=NULL){
				processus*p1=new processus(aux->nom,aux->dat_arrive,aux->temp_execution);
				this->ajout_fin(p1);
				aux=aux->next;
			}
		}
		processus* supp_deb(){
			processus*p=NULL;
			if(tete!=NULL){
			p=tete;
			tete=tete->next;
			p->next=NULL;
			} else cout<<"- La liste de processus est vide ! "<<endl;
		return(p);
		}
	     void trie(){
			int n=taille();
			if(n==0) cout<<endl<<"- La liste de processus est vide ! "<<endl;
			else if(n==1) cout<<endl<<"- La liste de processus est deja triee !"<<endl;
			else{ int i=0;
			  processus t[n],*aux; aux=tete;
			  while(aux!=NULL && i<n){
				  t[i]=*aux; i++;
			  	aux=aux->next;
			  }
			  int min; processus x;
			  for(int a=0;a<n-1;a++){
			  	min=a;
				  for(int b=a+1;b<n;b++){
			  		if(t[a].dat_arrive >t[b].dat_arrive) min =b;
			  	}
			  	x=t[a]; t[a]=t[min]; t[min]=x;
			  }
			  aux=tete; int k=0;
			while(aux!=NULL&& k<n){
				*aux=t[k]; k++;
				aux=aux->next;
		    }
			cout<<endl<<"- La liste de processus a ete triee avec succes !"<<endl;
			} cout<<endl; system("pause");
		}
};
#endif
