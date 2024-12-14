package fr.ubo.projetws.tpusers.service;

import fr.ubo.projetws.tpusers.model.Etudiant;
import fr.ubo.projetws.tpusers.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtudiantService {

    @Autowired
    private EtudiantRepository etudiantRepository;

    // Récupérer tous les étudiants
    public List<Etudiant> getAllEtudiants() {
        return etudiantRepository.findAll();
    }

    // Récupérer un étudiant par son ID
    public Etudiant getEtudiantById(Long id) {
        Optional<Etudiant> etudiant = etudiantRepository.findById(id);
        return etudiant.orElse(null);  // Retourne null si l'étudiant n'existe pas
    }

    // Sauvegarder ou mettre à jour un étudiant
    public Etudiant saveEtudiant(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }

    // Supprimer un étudiant
    public void deleteEtudiant(Long id) {
        etudiantRepository.deleteById(id);
    }
}
