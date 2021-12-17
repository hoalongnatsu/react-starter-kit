class Format {
  public static formatToCurrencyKo(value: number) {
    if (value) {
      return new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(value);
    }

    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(0);
  }
}

export default Format;
