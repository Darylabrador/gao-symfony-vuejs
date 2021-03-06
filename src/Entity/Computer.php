<?php

namespace App\Entity;

use App\Repository\ComputerRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ComputerRepository::class)
 */
class Computer
{

    /**
     * Date to filter attribution data
     */
    public static $date;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("attribution")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Unique(message="Le poste existe déjà")
     * @Groups("attribution")
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Assign::class, mappedBy="computer", orphanRemoval=true)
     * @Groups("attribution")
     */
    private $assigns;

    public function __construct()
    {
        $this->assigns = new ArrayCollection();
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

    /**
     * @return Collection|Assign[]
     */
    public function getAssigns(): Collection
    {
        $date = self::$date;
        return $this->assigns->filter(function ($attr) use ($date) {
            $chosenDate =  new DateTime($date);
            return $attr->getDate() == $chosenDate;
        });
    }

    public function addAssign(Assign $assign): self
    {
        if (!$this->assigns->contains($assign)) {
            $this->assigns[] = $assign;
            $assign->setComputer($this);
        }

        return $this;
    }

    public function removeAssign(Assign $assign): self
    {
        if ($this->assigns->removeElement($assign)) {
            // set the owning side to null (unless already changed)
            if ($assign->getComputer() === $this) {
                $assign->setComputer(null);
            }
        }

        return $this;
    }
}