export class Client 
{
    public idclient:string;
    public nom:string;
    public prenom:string;
    public personneAcontacter:string;
    public tel1:string;
    public tel2:string;
    public telPersonneAcontacter:string;
    public email:string;
    public MF:string;
    public manicipalite:string;
    public ville:string;
    public adresse:string;
    public pays:string;
    public zone:string;
    public note:string;

    constructor(id: string,nom: string,prenom: string,personneAcontacter: string,tel1?: string,
tel2?: string,telPersonneAcontacter?: string,email?: string,MF?: string,manicipalite?: string,
ville?: string,adresse?: string,pays?: string,zone?: string,note?: string) 
{
        this.idclient = id;
        this.nom = nom;
        this.prenom = prenom;
        this.personneAcontacter = personneAcontacter;
        this.tel1 = tel1 ?? '';
        this.tel2 = tel2 ?? '';
        this.telPersonneAcontacter = telPersonneAcontacter ?? '';
        this.email = email ?? '';
        this.MF = MF ?? '';
        this.manicipalite = manicipalite ?? '';
        this.ville = ville ?? '';
        this.adresse = adresse ?? '';
        this.pays = pays ?? '';
        this.zone = zone ?? '';
        this.note = note ?? '';
    }

    toString(): string {
        return `Client [id=${this.idclient}, nom=${this.nom}, email=${this.email}]`;
    }


    equals(other: Client): boolean {
        if (!(other instanceof Client)) {
            return false;
        }
        return this.idclient === other.idclient;
    }












}