import BaseService from "@core/class/BaseService";

class SampleService extends BaseService {

  public list = (body: Record<string, any>) => {
    return this.get("/sample", body);
  };

}

export default new SampleService("/api", false);
