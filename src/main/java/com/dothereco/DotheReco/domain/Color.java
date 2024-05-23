package com.dothereco.DotheReco.domain;

public enum Color {
    RED("#F0CAB9"),
    GREEN("#DBE9CD"),
    BLUE("#B9DEF0"),
    YELLOW("#FAE4A8"),
    ORANGE("#FFA500"),
    PURPLE("#CC99FF");
    private final String hexCode;


    Color(String hexCode) {
        this.hexCode = hexCode;
    }

    public String getHexCode() {
        return hexCode;
    }
}
