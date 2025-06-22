import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }



    async createItem({ name, type, description, coverImage, additionalImages }) {
        try {
            const items = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                { name, type, description, coverImage, additionalImages }
            );


            return items;
        } catch (error) {
            console.log(error);
        }
    }



    async getItemById(id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getItems() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.orderDesc("$createdAt")]
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    getFileView(fileId) {
        try {
            const imgUrl = this.storage.getFileView(conf.appwriteBucketId, fileId);


            return imgUrl
        } catch (error) {
            console.log("Error fetching file view:", error);
            return "https://via.placeholder.com/150";
        }
    }


}

const service = new Service();
export default service;

