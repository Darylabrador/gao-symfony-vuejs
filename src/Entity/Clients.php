<?php

namespace App\Entity;

use App\Repository\ClientsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ClientsRepository::class)
 */
class Clients
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $surname;

    /**
     * @ORM\OneToMany(targetEntity=Assigns::class, mappedBy="clients")
     */
    private $clients;

    public function __construct()
    {
        $this->clients = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(string $surname): self
    {
        $this->surname = $surname;

        return $this;
    }

    /**
     * @return Collection|Assigns[]
     */
    public function getClients(): Collection
    {
        return $this->clients;
    }

    public function addClient(Assigns $client): self
    {
        if (!$this->clients->contains($client)) {
            $this->clients[] = $client;
            $client->setClients($this);
        }

        return $this;
    }

    public function removeClient(Assigns $client): self
    {
        if ($this->clients->removeElement($client)) {
            // set the owning side to null (unless already changed)
            if ($client->getClients() === $this) {
                $client->setClients(null);
            }
        }

        return $this;
    }
}
