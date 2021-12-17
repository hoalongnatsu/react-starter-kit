class Path {
  public static trim(path: string, multi = true, direction = "") {
    if (multi) {
      return path.replace(/^\/+|\/+$/g, ""); // Ex: //foo/bar// => foo/bar
    }

    if (direction === "head") {
      return path.replace(/^\//, ""); // Ex: //foo/bar => /foo/bar
    } else if (direction === "tail") {
      return path.replace(/\/$/, ""); // Ex: foo/bar// => foo/bar/
    }

    return path.replace(/^\/|\/$/g, ""); // Ex: //foo/bar// => /foo/bar/
  }
}

export default Path;
