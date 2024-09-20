import apiClient from "./api-client";

interface Entity {
    id: number;
}

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
    getAll<T>() {
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, {
            signal: controller.signal,
        });

        return { request, cancel: () => controller.abort() }
    }

    add<T>(item: T) {
        return apiClient.post<T>(this.endpoint, item);
    }

    update<T extends Entity>(item: T) {
        return apiClient.put<T>(this.endpoint + '/' + item.id, item);

    }

    delete<T extends Entity>(item: Entity) {
        return apiClient.delete<T>(this.endpoint + '/' + item.id);

    }


}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;