{
    description = "The new juicyjul.es website";

    inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    outputs = { self, nixpkgs }:
        let
            system = "x86_64-linux";
            pkgs = import nixpkgs { inherit system; };
        in
        {
            packages.${system}.default = pkgs.stdenv.mkDerivation {
                pname = "juicyjul-es";
                version = "1.0.0";
                src = ./src;
                installPhase = ''
                    mkdir -p $out
                    cp -r ./* $out/
                '';
            };

            # For 'nix develop' shell
            devShells.${system}.default = pkgs.mkShell {
                buildInputs = [ pkgs.python3  ];
            };
        };
}