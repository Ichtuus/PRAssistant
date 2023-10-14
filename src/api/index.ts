import fetch from "node-fetch";

export class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async handleResponse<T>(response: any): Promise<T> {
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }

  async get<T>(
    endpoint: string,
    queryParams: Record<string, any> = {}
  ): Promise<T> {
    const url = new URL(`${this.baseURL}/${endpoint}`);

    Object.keys(queryParams).forEach((key) =>
      url.searchParams.append(key, queryParams[key].toString())
    );

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const url = new URL(`${this.baseURL}/${endpoint}`);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const url = new URL(`${this.baseURL}/${endpoint}`);

    const response = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const url = new URL(`${this.baseURL}/${endpoint}`);

    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      return null as any;
    }

    return this.handleResponse<T>(response);
  }
}
