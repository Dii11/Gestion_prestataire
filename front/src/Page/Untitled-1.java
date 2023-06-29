import java.util.HashSet;
import java.util.Set;

public class Patient {
    private String nom;
    private Set<String> ordonnance;

    public Patient(String n) {
        nom = n;
        ordonnance = new HashSet<String>();
    }

    public String getNom() {
        return nom;
    }

    public boolean ordonnanceVide() {
        return ordonnance.isEmpty();
    }

    public void affiche() {
        Terminal.ecrireStringln(getNom());
        afficheOrdonnance();
    }

    public void ajoutMedicament(String m) {
        ordonnance.add(m);
    }

    public boolean contientMedicament(String m) {
        return ordonnance.contains(m);
    }

    public void afficheOrdonnance() {
        for (String medicament : ordonnance) {
            Terminal.ecrireStringln(medicament);
        }
    }
}
